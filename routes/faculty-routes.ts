import express, { Request, Response } from "express";

const router = express.Router();

// 首頁
router.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to faculty page.....");
});

// 新增頁面
router.get("/new", (req: Request, res: Response) => {
  return res.send("Add new faculty page.....");
});

export default router;
