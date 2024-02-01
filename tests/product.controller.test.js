// test/product.controller.test.js

import { expect as _expect } from "chai";
const expect = _expect;
import { spy, stub } from "sinon";
import { getProduct } from "../src/controllers/product.controller";
import Product, { findById } from "../src/models/product.model";

describe("Product Controller", () => {
  describe("getProduct", () => {
    it("should return a product by id", async () => {
      const req = {
        params: {
          id: "123",
        },
      };
      const res = {
        json: spy(),
      };

      const mockProduct = {
        _id: "123",
        name: "Test Product",
        price: 100,
      };

      stub(Product, "findById").returns(mockProduct);

      await getProduct(req, res);

      expect(res.json.calledWith(mockProduct)).to.be.true;

      findById.restore();
    });
  });
});
