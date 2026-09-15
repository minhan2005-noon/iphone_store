"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: { slug: string; name: string };
  price: number;
  compareAtPrice: number;
  stock: number;
  featured: boolean;
  color: string;
  specs: Record<string, string>;
  imageUrl: string;
};

type CartLine = { product: Product; quantity: number };
type Category = "all" | "iphone" | "macbook" | "phu-kien";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const categories: { slug: Category; label: string; count: number; eyebrow: string }[] = [
  { slug: "all", label: "Tất cả", count: 90, eyebrow: "Toàn bộ tuyển chọn" },
  { slug: "iphone", label: "iPhone", count: 30, eyebrow: "Nhẹ hơn. Mạnh hơn." },
  { slug: "macbook", label: "MacBook", count: 30, eyebrow: "Hiệu năng đi cùng bạn." },
  { slug: "phu-kien", label: "Phụ kiện", count: 30, eyebrow: "Hoàn thiện hệ sinh thái." },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="ÂN Store - về đầu trang">
      <span className="brand-lockup" aria-hidden="true">
        <span>Â</span><span className="apple-mark"><i /></span><span>N</span>
      </span>
      <span className="brand-caption">Apple concept store</span>
    </a>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const discount = Math.max(0, Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100));
  const specValues = Object.values(product.specs).slice(0, 2);

  return (
    <article className="product-card">
      <div className={`product-media product-media--${product.category.slug}`}>
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        <span className="product-index">{product.sku}</span>
        {discount > 0 && <span className="discount-badge">−{discount}%</span>}
      </div>
      <div className="product-copy">
        <div className="product-meta"><span>{product.category.name}</span><span>{product.stock > 0 ? `Còn ${product.stock}` : "Hết hàng"}</span></div>
        <h3>{product.name}</h3>
        <p>{product.shortDescription}</p>
        <div className="spec-row">{specValues.map((spec) => <span key={spec}>{spec}</span>)}</div>
        <div className="price-row">
          <div><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.compareAtPrice)}</del></div>
          <button disabled={!product.stock} onClick={() => onAdd(product)} aria-label={`Thêm ${product.name} vào giỏ`}>
            Thêm <span aria-hidden="true">＋</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(90);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderState, setOrderState] = useState<{ type: "idle" | "sending" | "success" | "error"; message: string }>({ type: "idle", message: "" });

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ category, search, sort, limit: String(limit) });
        const response = await fetch(`${API_URL}/api/products?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Không tải được sản phẩm");
        const data = await response.json();
        setProducts(data.items);
        setTotal(data.pagination.total);
      } catch (fetchError) {
        if ((fetchError as Error).name !== "AbortError") setError("Chưa kết nối được API. Hãy chạy API ở cổng 3001 rồi tải lại trang.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, [category, search, sort, limit]);

  useEffect(() => setLimit(12), [category, search, sort]);

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const activeCategory = useMemo(() => categories.find((item) => item.slug === category) || categories[0], [category]);

  const selectCategory = (nextCategory: Category) => {
    setCategory(nextCategory);
    document.querySelector("#san-pham")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addToCart = (product: Product) => {
    setOrderState({ type: "idle", message: "" });
    setCart((current) => {
      const found = current.find((line) => line.product.id === product.id);
      if (found) return current.map((line) => line.product.id === product.id ? { ...line, quantity: Math.min(line.quantity + 1, product.stock) } : line);
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (productId: number, change: number) => {
    setCart((current) => current
      .map((line) => line.product.id === productId ? { ...line, quantity: Math.max(0, Math.min(line.quantity + change, line.product.stock)) } : line)
      .filter((line) => line.quantity > 0));
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setOrderState({ type: "sending", message: "Đang gửi đơn hàng…" });
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.get("customerName"),
          customerPhone: form.get("customerPhone"),
          customerAddress: form.get("customerAddress"),
          items: cart.map((line) => ({ productId: line.product.id, quantity: line.quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Không thể tạo đơn hàng");
      setOrderState({ type: "success", message: `${data.message} Mã đơn: ${data.order.orderCode}` });
      setCart([]);
    } catch (submitError) {
      setOrderState({ type: "error", message: (submitError as Error).message });
    }
  };

  return (
    <main
      id="top"
      className="storefront-shell"
      onCopy={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest("input, textarea")) event.preventDefault();
      }}
    >
      <div className="pixel-background" aria-hidden="true">
        <span className="pixel-shape pixel-shape--cube-one" />
        <span className="pixel-shape pixel-shape--cube-two" />
        <span className="pixel-shape pixel-shape--orb-one" />
        <span className="pixel-shape pixel-shape--orb-two" />
        <span className="pixel-shape pixel-shape--star-one">✦</span>
        <span className="pixel-shape pixel-shape--star-two">✦</span>
        <span className="pixel-shape pixel-shape--heart">♥</span>
        <span className="pixel-shape pixel-shape--pixels" />
      </div>
      <div className="announcement"><p>Miễn phí giao nhanh nội thành cho đơn từ 2 triệu</p><p>· Bảo hành 12 tháng</p></div>
      <header className="site-header">
        <Brand />
        <nav aria-label="Danh mục chính">
          {categories.slice(1).map((item) => <button key={item.slug} onClick={() => selectCategory(item.slug)}>{item.label}</button>)}
        </nav>
        <button className="cart-trigger" onClick={() => setCartOpen(true)}>Giỏ hàng <span>{cartCount}</span></button>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">ÂN Store · Tuyển chọn 2026</p>
          <h1 id="hero-title">Chuẩn Apple.<br /><em>Đậm chất Hoàng Minh Ân</em></h1>
          <p className="hero-description">Một nơi cho mọi thiết bị bạn yêu — từ chiếc iPhone đầu tiên đến góc làm việc MacBook hoàn chỉnh.</p>
          <div className="hero-actions"><button onClick={() => selectCategory("all")}>Khám phá 90 sản phẩm <span>↗</span></button><a href="#cam-ket">Vì sao chọn ÂN?</a></div>
          <div className="hero-stats" aria-label="Thống kê cửa hàng">
            <div><strong>90</strong><span>Sản phẩm chọn lọc</span></div><div><strong>03</strong><span>Nhóm sản phẩm</span></div><div><strong>12T</strong><span>Bảo hành demo</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1758786611137-9fd075b170d5?auto=format&fit=crop&w=1600&q=88" alt="iPhone màu bạc trong không gian tối giản" />
          <div className="hero-card hero-card--top"><span>Mới</span>iPhone collection</div>
          <div className="hero-card hero-card--bottom"><strong>Trả góp 0%</strong><span>Qua đối tác tài chính</span></div>
        </div>
      </section>

      <section className="category-strip" aria-label="Chọn danh mục">
        {categories.slice(1).map((item, index) => (
          <button key={item.slug} onClick={() => selectCategory(item.slug)} className={category === item.slug ? "active" : ""}>
            <span>0{index + 1}</span><strong>{item.label}</strong><small>{item.eyebrow}</small><i>{item.count} sản phẩm →</i>
          </button>
        ))}
      </section>

      <section className="catalog" id="san-pham">
        <div className="catalog-heading"><div><p className="eyebrow">Danh mục / {activeCategory.label}</p><h2>{activeCategory.eyebrow}</h2></div><p><strong>{total}</strong> sản phẩm phù hợp</p></div>
        <div className="catalog-tools">
          <label className="search-field"><span>Tìm kiếm</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="iPhone Pro, MacBook Air…" /></label>
          <div className="filter-tabs" role="group" aria-label="Lọc danh mục">
            {categories.map((item) => <button key={item.slug} className={category === item.slug ? "active" : ""} onClick={() => setCategory(item.slug)}>{item.label}</button>)}
          </div>
          <label className="sort-field"><span>Sắp xếp</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Nổi bật</option><option value="newest">Mới nhất</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option><option value="name">Tên A–Z</option></select></label>
        </div>

        {error && <div className="api-notice" role="alert">{error}</div>}
        {loading && products.length === 0 ? (
          <div className="loading-grid" aria-label="Đang tải sản phẩm">{Array.from({ length: 8 }, (_, index) => <div key={index} />)}</div>
        ) : (
          <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>
        )}
        {!loading && !error && products.length === 0 && <div className="empty-state"><strong>Không tìm thấy sản phẩm.</strong><span>Thử từ khóa hoặc danh mục khác nhé.</span></div>}
        {products.length < total && <button className="load-more" onClick={() => setLimit((current) => Math.min(current + 12, 90))} disabled={loading}>{loading ? "Đang tải…" : `Xem thêm ${Math.min(12, total - products.length)} sản phẩm`}</button>}
      </section>

      <section className="promise" id="cam-ket">
        <div className="promise-intro"><p className="eyebrow">Đặc quyền tại ÂN</p><h2>Mua công nghệ.<br />Nhận sự an tâm.</h2></div>
        <div className="promise-list">
          <article><span>01</span><div><h3>Đúng sản phẩm</h3><p>Thông tin rõ ràng, tư vấn theo nhu cầu sử dụng thực tế.</p></div></article>
          <article><span>02</span><div><h3>Đúng trải nghiệm</h3><p>Giao nhanh, hỗ trợ cài đặt và chuyển dữ liệu cơ bản.</p></div></article>
          <article><span>03</span><div><h3>Đúng cam kết</h3><p>Chính sách bảo hành và đổi trả được trình bày minh bạch.</p></div></article>
          <article><span>03</span><div><h3>Đúng tài chính</h3><p>Phù hợp cho học sinh và sinh viên.</p></div></article>
        </div>
      </section>

      <footer><Brand /><p>iPhone · MacBook · Phụ kiện Apple</p><p>© 2026 ÂN Store.</p></footer>

      <div className={`drawer-backdrop ${cartOpen ? "visible" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen} aria-label="Giỏ hàng">
        <div className="drawer-header"><div><p>Giỏ hàng của bạn</p><strong>{cartCount} sản phẩm</strong></div><button onClick={() => setCartOpen(false)} aria-label="Đóng giỏ hàng">×</button></div>
        {cart.length === 0 ? (
          orderState.type === "success" ? (
            <div className="cart-empty cart-success"><span>✓</span><h3>Đặt hàng thành công</h3><p>{orderState.message}</p><button onClick={() => { setOrderState({ type: "idle", message: "" }); setCartOpen(false); }}>Tiếp tục khám phá</button></div>
          ) : (
            <div className="cart-empty"><span>ÂN</span><h3>Giỏ hàng đang trống</h3><p>Chọn một thiết bị bạn thích để bắt đầu.</p><button onClick={() => { setCartOpen(false); selectCategory("all"); }}>Xem sản phẩm</button></div>
          )
        ) : (
          <>
            <div className="cart-lines">
              {cart.map((line) => (
                <article key={line.product.id}>
                  <img src={line.product.imageUrl} alt="" />
                  <div><h3>{line.product.name}</h3><p>{formatPrice(line.product.price)}</p><div className="quantity-control"><button onClick={() => changeQuantity(line.product.id, -1)}>−</button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.product.id, 1)}>＋</button></div></div>
                  <button className="remove-line" onClick={() => changeQuantity(line.product.id, -line.quantity)} aria-label={`Xóa ${line.product.name}`}>×</button>
                </article>
              ))}
            </div>
            <div className="cart-summary"><div><span>Tạm tính</span><strong>{formatPrice(cartTotal)}</strong></div><small>Phí giao hàng được xác nhận khi cửa hàng liên hệ.</small><button onClick={() => setCheckoutOpen((current) => !current)}>{checkoutOpen ? "Đóng thông tin" : "Tiến hành đặt hàng"}</button></div>
            {checkoutOpen && (
              <form className="checkout-form" onSubmit={submitOrder}>
                <label>Họ và tên<input name="customerName" required minLength={2} placeholder="Nguyễn Văn An" /></label>
                <label>Số điện thoại<input name="customerPhone" required inputMode="tel" placeholder="0901 234 567" /></label>
                <label>Địa chỉ giao hàng<textarea name="customerAddress" required minLength={8} placeholder="Số nhà, đường, phường/xã, tỉnh/thành" /></label>
                <button disabled={orderState.type === "sending"}>{orderState.type === "sending" ? "Đang gửi…" : `Đặt hàng · ${formatPrice(cartTotal)}`}</button>
                {orderState.message && <p className={`order-message ${orderState.type}`}>{orderState.message}</p>}
              </form>
            )}
          </>
        )}
      </aside>
    </main>
  );
}
