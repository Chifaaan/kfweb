import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Riwayat Penerimaan Barang', href: '/penerimaan' },
];

// Dummy data
const dummyPenerimaanData = [
    {
        id: 1,
        nomorSuratPemesanan: 'POIL-001',
        namaPengentri: 'Budi Santoso',
        kreditur: 'PT. Kimia Farma',
        nomorFaktur: 'INV-001',
        tglPenerimaan: '2025-08-01',
        tglFaktur: '2025-07-31',
        tglTerimaFisik: '2025-08-02',
        top: 60,
        ppnType: 'Include',
    },
    {
        id: 2,
        nomorSuratPemesanan: 'POIL-002',
        namaPengentri: 'Siti Aminah',
        kreditur: 'PT. Sehat Selalu',
        nomorFaktur: 'INV-002',
        tglPenerimaan: '2025-08-05',
        tglFaktur: '2025-08-04',
        tglTerimaFisik: '2025-08-06',
        top: 30,
        ppnType: 'Include',
    },
    {
        id: 3,
        nomorSuratPemesanan: 'POIL-003',
        namaPengentri: 'Dewi Lestari',
        kreditur: 'PT. Prima Sejahtera',
        nomorFaktur: 'INV-003',
        tglPenerimaan: '2025-08-08',
        tglFaktur: '2025-08-07',
        tglTerimaFisik: '2025-08-09',
        top: 60,
        ppnType: 'Include',
    },
    {
        id: 4,
        nomorSuratPemesanan: 'POIL-004',
        namaPengentri: 'Deto seto',
        kreditur: 'PT. Xyzie inc',
        nomorFaktur: 'INV-004',
        tglPenerimaan: '2025-09-24',
        tglFaktur: '2025-08-28',
        tglTerimaFisik: '2025-09-25',
        top: 70,
        ppnType: 'Include',
    },
    {
        id: 5,
        nomorSuratPemesanan: 'POIL-005',
        namaPengentri: 'Irvan Hakim',
        kreditur: 'PT. Alfa Omega',
        nomorFaktur: 'INV-003',
        tglPenerimaan: '2025-12-11',
        tglFaktur: '2025-10-24',
        tglTerimaFisik: '2025-12-11',
        top: 65,
        ppnType: 'Include',
    },
];

// Fungsi export CSV
function exportToCSV<T extends object>(data: T[], filename: string) {
    if (!data.length) return;
    const csvRows = [];

    // Ambil header dari key object
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Ambil data setiap row
    for (const row of data) {
        const values = headers.map(header => {
            const val = (row as Record<string, unknown>)[header] ?? "";
            return `"${String(val).replace(/"/g, '""')}"`;
        });
        csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function RiwayatPenerimaan() {
    const [search, setSearch] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterPPn, setFilterPPn] = useState('Semua');

    const filteredData = dummyPenerimaanData.filter((item) => {
        const matchesSearch =
            item.nomorFaktur.toLowerCase().includes(search.toLowerCase()) ||
            item.kreditur.toLowerCase().includes(search.toLowerCase()) ||
            item.namaPengentri.toLowerCase().includes(search.toLowerCase());

        const matchesDate = filterDate ? item.tglPenerimaan === filterDate : true;
        const matchesPPn = filterPPn === 'Semua' ? true : item.ppnType === filterPPn;

        return matchesSearch && matchesDate && matchesPPn;
    });

    const handleReset = () => {
        setSearch('');
        setFilterDate('');
        setFilterPPn('Semua');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Penerimaan" />
            <div className="min-h-screen px-4 md:px-16 py-10">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Penerimaan Barang</h1>

                {/* FILTER */}
                <div className="flex flex-wrap gap-4 mb-6 items-center">
                    <input
                        type="text"
                        placeholder="Cari: No Faktur / Kreditur / Pengentri"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-2 w-72"
                    />
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border rounded px-3 py-2"
                    />
                    <select
                        value={filterPPn}
                        onChange={(e) => setFilterPPn(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="Semua">Semua Status PPn</option>
                        <option value="Include">Include</option>
                    </select>
                    <Button variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button onClick={() => exportToCSV(filteredData, 'riwayat-penerimaan')}>
                        Export
                    </Button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto rounded-lg shadow bg-white">
                    <table className="min-w-full text-sm text-gray-800">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <Th>No</Th>
                                <Th>Nomor Surat Pemesanan</Th>
                                <Th>Nama Pengentri</Th>
                                <Th>Kreditur</Th>
                                <Th>Nomor Faktur</Th>
                                <Th>Tgl Penerimaan</Th>
                                <Th>Tgl Faktur</Th>
                                <Th>Tgl Terima Fisik</Th>
                                <Th>TOP (Hari)</Th>
                                <Th>PPn</Th>
                                <Th>Action</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr key={item.id} className="hover:bg-gray-50 border-t">
                                    <Td>{idx + 1}</Td>
                                    <Td>{item.nomorSuratPemesanan}</Td>
                                    <Td>{item.namaPengentri}</Td>
                                    <Td>{item.kreditur}</Td>
                                    <Td>{item.nomorFaktur}</Td>
                                    <Td>{item.tglPenerimaan}</Td>
                                    <Td>{item.tglFaktur}</Td>
                                    <Td>{item.tglTerimaFisik}</Td>
                                    <Td>{item.top}</Td>
                                    <Td>
                                        <span
                                            className={`px-2 py-1 text-xs rounded font-medium ${
                                                item.ppnType === 'Include'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {item.ppnType}
                                        </span>
                                    </Td>
                                    <Td>
                                        <div className="flex gap-2">
                                            <button className="text-blue-600 hover:underline text-xs">Detail</button>
                                            <button className="text-orange-600 hover:underline text-xs">Edit</button>
                                            <button className="text-red-600 hover:underline text-xs">Hapus</button>
                                        </div>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 text-sm text-gray-500">
                    Menampilkan {filteredData.length} dari {dummyPenerimaanData.length} entri | Terakhir diperbarui: 14:32
                </div>
            </div>
        </AppLayout>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
    return <td className="px-4 py-2 whitespace-nowrap">{children}</td>;
}