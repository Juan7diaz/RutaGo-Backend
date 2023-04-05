import express from "express";
import cors from "cors";

class Server {
  port: string | undefined;
  app: any;

  constructor() {
    this.app = express();
    this.middlewares();
    this.port = process.env.port;
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
