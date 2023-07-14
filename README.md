# 我的餐廳清單

## 專案介紹

#### 透過這個網站，創造專屬於自己的美食餐廳地圖。網頁可紀錄餐廳資訊，探索餐廳完也可隨時修改或刪除。

## 產品功能

- 可用臉書登入帳號，或創建自己帳號，隨時記錄專屬的餐廳清單
- 點擊任一餐廳可閱讀詳細資訊
- 可以關鍵字查詢符合店名之店家列表

## 開發工具\*\*\*\*

- Node.js
- Express
- Express-handlebars
- Body-parser
- Express-session
- Passport
- Passport-local
- Passport-facebook
- Mongoose
- Connect-flash
- Bcryptjs
- Method-override
- Dotenv
- Bootstrap

## 開始使用

1. 確認本地已安裝 Node.js 與 npm

2. 創建資料夾並使用 terminal 的 cd 指令將路徑移至該資料夾

3. 打開終端機，輸入以下指令，可 Clone 專案至本地端

```
git clone https://github.com/keitakeiko/restaurant.git
```

4. 進入此專案資料夾，安裝相關開發軟體

```
npm install
```

5. 安裝 nodemon

```
npm install -g nodemon
```

6. 在專案新增 .env 資料夾，放入自己 MongoDB 連線字串

```
MONGODB_URI = "<你的連線字串>"
```

7. 可建立種子資料

```
npm run seed
```

seed 提供兩組預設帳號體驗
| Name | Email | Password |
| --- | --- | --- |
| user1 | user1@example.com | 12345678 |
| user2 | user2@example.com | 12345678 |

8. 啟動伺服器

```
npm run dev
```

9. 顯示以下資訊代表本專案順利運行，輸入網址至瀏覽器便可瀏覽此專案網頁

```
   expresss is listening on http://localhost:3000
```

10. 若要停止使用，請輸入以下指令

```
   ctrl + c
```

# 開發人員

- Keiko
- Alpha Camp
