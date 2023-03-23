process.env.NODE_ENV = "test";
jest.setTimeout(20000);

const app = require("./app");
const request = require("supertest");


describe("Testing /items routes", () => {

    beforeEach(() => {
        items.push({name: "Soda", price: 0.50, qty: 10});
    });

    afterEach(() => {
        global.items.length = 0;
    });

    test("Testing GET", async () => {
        console.log("Before GET request");
        const resp = await request(app).get('/items');
        console.log("After GET request");
        console.log("\n\nResponse body: ",resp.body);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{name: "Soda", price: 0.50, qty: 10}]);
    });

    test("Testing POST", async() => {
        const resp = await request(app).post("/items").send({"name": "toothpaste", "price" : 2.50, "qty" : 1});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"added": {"name": "toothpaste", "price" : 2.50, "qty" : 1}});
    })


    test("Testing GET single item", async() => {
        const resp = await request(app).get("/items/Soda");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"name": "Soda", "price": 0.5, "qty": 10});
    })


    test("Testing PATCH", async() => {
        const resp = await request(app).patch("/items/Soda").send({"name": "Soda", "price" : 18.50, "qty" : 1});
        expect(resp.statusCode).toBe(202);
        expect(resp.body).toEqual({"updated": {"name": "Soda", "price": 18.5, "qty": 1}});
    })



    test("Testing DELETE", async() => {
        const resp = await request(app).delete("/items/Soda");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"message": "Deleted"});
    })

});

