# 🚀 ریلی Netlify (Edge Function)

> ⚡ یک پراکسی/ریلی سبک با استفاده از **Netlify Edge Functions**
> ساخته شده توسط **amirs**

---

## 🌐 دمو

بعد از دیپلوی:

```
https://your-site.netlify.app
```

---

## ✨ ویژگی‌ها

* ⚡ اجرای سریع روی Edge
* 🔁 انتقال کامل درخواست‌ها (Relay)
* 🌍 اجرا روی CDN نتلیفای
* 🔒 تنظیم دامنه با env
* 🧩 ساختار ساده و سبک

---

## 📦 ساختار پروژه

```
.
├── netlify/
│   └── edge-functions/
│       └── relay.js
├── public/
│   └── index.html
├── netlify.toml
├── package.json
```

---

## ⚙️ متغیر محیطی (خیلی مهم)

باید اینو ست کنی:

```
TARGET_DOMAIN=https://example.com
```

---

## 🚀 دیپلوی از طریق سایت Netlify

1. برو به:

```
https://app.netlify.com
```

2. گزینه:

```
Add new project → Import from GitHub
```

3. ریپوی خودت رو انتخاب کن

4. تنظیمات:

```
Build command: npm run build
Publish directory: public
```

5. متغیر محیطی اضافه کن:

```
TARGET_DOMAIN=https://دامنه-خودت.com
```

6. Deploy کن 🎉

---

## 💻 دیپلوی با CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 🧪 تست

برو به:

```
https://your-site.netlify.app
```

درخواست‌ها به دامنه مقصد پاس داده می‌شن

---

## ⚠️ نکات مهم

* فقط برای دامنه‌هایی که مالکشی استفاده کن
* استفاده اشتباه ممکنه باعث بلاک شدن بشه

---

## 👤 سازنده

**amirs**

---

## 📜 لایسنس

MIT License © amirs
