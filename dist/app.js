"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const app = (0, express_1.default)();
// express app config
app.use(body_parser_1.default.json()); //
//mongodb connection
mongoose_1.default.connect(process.env.DB, {})
    .then((response) => console.log('connected to MongoDB'))
    .catch((error) => console.log(`Connection failed: ${error}`));
app.listen(4000, () => {
    console.log('Express API running on port 4000');
});
app.use('/api/v1/movies', movieRoutes_1.default);
