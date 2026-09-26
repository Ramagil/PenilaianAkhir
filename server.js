const express = require('express')
const app = express()
const port = 3000
const db = require('./config/db')
const cors = require('cors')

app.use(cors());
app.use(express.json());


app.get('/api/siswa', (req, res) => {
    const sql = "SELECT * FROM siswa";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
})

app.get('/api/siswa/:id', (req, res) => {
    const sql = "SELECT * FROM siswa WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    })
})

app.post('/api/siswa/', (req, res) => {
    const { nis ,nama, kelas, jurusan, alamat } = req.body;
    let errors = []; 

    if (nis === undefined || nis === null || isNaN(nis) || Number(nis) <= 0) errors.push("NIS valid");
    if (!nama || nama.trim() === "") errors.push("Nama harus diisi"); 
    if (kelas === undefined || kelas === null || isNaN(kelas) || Number(kelas) < 0) errors.push("Kelas tidak valid"); 
    if (!jurusan || jurusan.trim() === "") errors.push("juruasn tidak valid"); 
    if (!alamat || alamat.trim() === "") errors.push("alamat tidak valid"); 

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }

    const sql = 'INSERT INTO siswa (nis, nama, kelas, jurusan, alamat) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nis, nama, kelas, jurusan, alamat], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data Added", id: result.insertId });
    })
})

app.put('/api/siswa/:id', (req, res) => {
    const { nis, nama, kelas, jurusan, alamat } = req.body;
    const id = req.params.id; 
    let errors = []; 

    if (nis === undefined || nis === null || isNaN(nis) || Number(nis) <= 0) errors.push("NIS valid");
    if (!nama || nama.trim() === "") errors.push("Nama harus diisi"); 
    if (kelas === undefined || kelas === null || isNaN(kelas) || Number(kelas) < 0) errors.push("Kelas tidak valid"); 
    if (!jurusan || jurusan.trim() === "") errors.push("juruasn tidak valid"); 
    if (!alamat || alamat.trim() === "") errors.push("alamat tidak valid"); 

    if (errors.length > 0) {
        return res.status(400).json({ errors: errors });
    }

    const sql = 'UPDATE siswa SET nis = ?, nama = ?, kelas = ?, jurusan = ?, alamat = ? WHERE id = ?';
    db.query(sql, [nis, nama, kelas, jurusan, alamat, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const sql2 = "SELECT * FROM siswa WHERE id = ?";
        db.query(sql2, [id], (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data diubah", data: data[0] });
        })
    })
})

app.delete('/api/siswa/:id', (req, res) => {
    const sql = "DELETE FROM siswa WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data dihapus" });
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})