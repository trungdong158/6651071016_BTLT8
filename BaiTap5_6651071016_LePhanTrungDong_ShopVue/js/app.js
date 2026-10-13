// Dữ liệu khởi đầu cho danh sách phụ kiện; mỗi ảnh đều nằm trong thư mục images.
const danhSachSanPham = [
  {
    id: 1,
    ten: 'Ốp lưng trong suốt MagSafe',
    nhom: 'Ốp lưng',
    gia: 189000,
    moTa: 'Ốp chống sốc trong suốt, hỗ trợ sạc MagSafe.',
    hinhAnh: '../images/op-lung.svg',
  },
  {
    id: 2,
    ten: 'Tai nghe chụp tai Wave',
    nhom: 'Âm thanh',
    gia: 590000,
    moTa: 'Âm thanh sống động, đệm tai êm và gọn nhẹ.',
    hinhAnh: '../images/tai-nghe.svg',
  },
  {
    id: 3,
    ten: 'Đế sạc không dây 15W',
    nhom: 'Sạc & cáp',
    gia: 349000,
    moTa: 'Sạc nhanh không dây, thiết kế mỏng tối giản.',
    hinhAnh: '../images/de-sac.svg',
  },
  {
    id: 4,
    ten: 'Tai nghe Bluetooth Buds',
    nhom: 'Âm thanh',
    gia: 790000,
    moTa: 'Tai nghe true wireless có hộp sạc tiện lợi.',
    hinhAnh: '../images/tai-nghe-buds.svg',
  },
  {
    id: 5,
    ten: 'Sạc dự phòng Mini 10000mAh',
    nhom: 'Sạc & cáp',
    gia: 499000,
    moTa: 'Dung lượng lớn, nhỏ gọn cho cả ngày dài.',
    hinhAnh: '../images/sac-du-phong.svg',
  },
  {
    id: 6,
    ten: 'Cáp sạc Type-C bọc dù',
    nhom: 'Sạc & cáp',
    gia: 129000,
    moTa: 'Cáp bền chắc, hỗ trợ sạc nhanh và truyền dữ liệu.',
    hinhAnh: '../images/cap-sac.svg',
  },
  {
    id: 7,
    ten: 'Giá đỡ điện thoại Flex',
    nhom: 'Tiện ích',
    gia: 159000,
    moTa: 'Góc nhìn linh hoạt, gấp gọn mang đi tiện lợi.',
    hinhAnh: '../images/gia-do.svg',
  },
  {
    id: 8,
    ten: 'Miếng dán cường lực Pro',
    nhom: 'Bảo vệ',
    gia: 99000,
    moTa: 'Kính trong sắc nét, hạn chế trầy xước màn hình.',
    hinhAnh: '../images/cuong-luc.svg',
  },
];

const dinhDangVND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

Vue.createApp({
  data() {
    return {
      products: danhSachSanPham,
      cart: [],
      tuKhoa: '',
    };
  },
  methods: {
    // Methods xử lý hành động của người dùng và thay đổi dữ liệu giỏ hàng.
    themVaoGio(sanPham) {
      const matHangDaCo = this.cart.find((matHang) => matHang.id === sanPham.id);

      if (matHangDaCo) {
        matHangDaCo.quantity += 1;
        return;
      }

      this.cart.push({ ...sanPham, quantity: 1 });
    },
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },
    dinhDangTien(gia) {
      return dinhDangVND.format(gia);
    },
  },
  computed: {
    // Computed tự tính lại khi cart hoặc tuKhoa thay đổi, không cần cập nhật DOM thủ công.
    cartCount() {
      return this.cart.reduce((tong, matHang) => tong + matHang.quantity, 0);
    },
    tongTien() {
      return this.cart.reduce((tong, matHang) => tong + matHang.gia * matHang.quantity, 0);
    },
    danhSachLoc() {
      const tuKhoa = this.tuKhoa.trim().toLocaleLowerCase('vi');

      if (!tuKhoa) {
        return this.products;
      }

      return this.products.filter((sanPham) => {
        const noiDungTimKiem = `${sanPham.ten} ${sanPham.moTa}`.toLocaleLowerCase('vi');
        return noiDungTimKiem.includes(tuKhoa);
      });
    },
  },
  // Vue theo dõi dữ liệu có tính phản ứng (reactivity) và tự cập nhật giao diện.
  // Với Vanilla JS, mỗi lần thêm/xóa giỏ hàng phải tự querySelector và cập nhật DOM.
}).mount('#app');
