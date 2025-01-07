import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import reportRoutes from './Routes/reportRoutes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';




dotenv.config();
const app = express();
const swaggerOptions = {
    swaggerDefinition: {
        info : {
            title: "Report API",
            description: "API for generating reports",
            contact: {
                name: "Report API"
            },
            servers: ["http://localhost:5000"]
        },


        },
        apis:["src/index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(express.json());
app.use(cors());



/**
 * @swagger
 * /api/reports/total-patients:
 *   get:
 *     summary: Get report of total patients
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-01-01"
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Get report of total patients
 */

/**
 * @swagger
 * /api/reports/total-revenue:  
 *   get:
 *     summary: Get report of total revenue
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-01-01"
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Get report of total revenue
 */

/**
 * @swagger
 * /api/reports/total-appointments:
 *   get:
 *     summary: Get report of total appointments
 *     parameters:
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-01-01"
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-12-31"
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Get report of total appointments
 */



app.use('/api/reports', reportRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port ", process.env.PORT);
    connectDB();
});