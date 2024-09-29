import React, { useState } from 'react';
import axios from 'axios';

const ProductReports = () => {
    const [reportType, setReportType] = useState('weekly');
    const [reportData, setReportData] = useState([]);

    const fetchReport = async () => {
        const res = await axios.get('http://localhost:5000/api/products/reports', {
            params: { period: reportType }
        });
        setReportData(res.data);
    };

    return (
        <div>
            <h1>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h1>
            <select onChange={(e) => setReportType(e.target.value)}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <button onClick={fetchReport}>Generate Report</button>
            <ul>
                {reportData.map((report, index) => (
                    <li key={index}>
                        Category: {report._id} | Total Products: {report.totalProducts} | Total Worth: ${report.totalWorth}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductReports;
