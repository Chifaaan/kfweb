import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Form Penerimaan Barang',
        href: '/penerimaan/history',
    },
];

export default function PenerimaanBarangForm() {
    const [form, setForm] = useState({
        nomorPesanan: '',
        namaPengentri: '',
        kreditur: '',
        nomorFaktur: '',
        tglPenerimaan: '',
        tglFaktur: '',
        tglTerimaFisik: '',
        top: '60',
        ppnType: 'Exclude',
        ppnValue: '11%',
    });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true); // Tampilkan popup konfirmasi
    };

    const handleConfirmYes = () => {
        setShowConfirm(false);
        window.location.href = '/penerimaan/history'; // Redirect ke history
    };

    const handleConfirmCancel = () => {
        setShowConfirm(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Form Penerimaan" />
            <div className="min-h-screen w-full px-2 md:px-16 py-10 bg-white">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Form Penerimaan Barang</h1>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Nomor Surat Pemesanan */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Nomor Surat Pemesanan</label>
                            <input
                                type="text"
                                name="nomorPesanan"
                                value={form.nomorPesanan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="POIL-001"
                                required
                            />
                        </div>

                        {/* Nama Pengentri */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Nama Pengentri</label>
                            <input
                                type="text"
                                name="namaPengentri"
                                value={form.namaPengentri}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nama Anda"
                                required
                            />
                        </div>

                        {/* Kreditur */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Kreditur</label>
                            <input
                                type="text"
                                name="kreditur"
                                value={form.kreditur}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nama Kreditur"
                                required
                            />
                        </div>

                        {/* Nomor Faktur */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Nomor Faktur</label>
                            <input
                                type="text"
                                name="nomorFaktur"
                                value={form.nomorFaktur}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nomor Faktur"
                                required
                            />
                        </div>

                        {/* Tanggal Penerimaan */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Tanggal Penerimaan Barang</label>
                            <input
                                type="date"
                                name="tglPenerimaan"
                                value={form.tglPenerimaan}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Tanggal Faktur */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Tanggal Faktur</label>
                            <input
                                type="date"
                                name="tglFaktur"
                                value={form.tglFaktur}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* TOP */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">TOP (dalam hari)</label>
                            <input
                                type="number"
                                name="top"
                                value={form.top}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min={0}
                            />
                        </div>

                        {/* Tanggal Terima Fisik Faktur */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Tanggal Terima Fisik Faktur</label>
                            <input
                                type="date"
                                name="tglTerimaFisik"
                                value={form.tglTerimaFisik}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* PPn Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">PPn</label>
                            <div className="space-y-2">
                                {['Include', 'Exclude', 'Tanpa PPN'].map((type) => (
                                    <div key={type} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={type}
                                            name="ppnType"
                                            value={type}
                                            checked={form.ppnType === type}
                                            onChange={handleChange}
                                            className="mr-2 accent-blue-600 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label htmlFor={type}>{type}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jumlah PPn */}
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Jumlah PPn</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="ppnValue"
                                    value="11%"
                                    checked={form.ppnValue === '11%'}
                                    onChange={handleChange}
                                    className="mr-2 accent-blue-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <span>11%</span>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div className="pt-8 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold shadow transition"
                        >
                            Simpan
                        </button>
                    </div>
                </form>

                {/* Popup Konfirmasi */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
                            <h2 className="text-lg font-bold mb-2 text-gray-800">Konfirmasi Simpan</h2>
                            <p className="mb-6 text-gray-600">Apakah Anda yakin ingin menyimpan data penerimaan barang?</p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={handleConfirmCancel}
                                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmYes}
                                    className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// Komponen Baris Tabel
function TableRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
            <td className="w-1/4 bg-gray-50 px-4 py-3 font-medium text-gray-700 align-top">{label}</td>
            <td className="px-4 py-3">{children}</td>
        </tr>
    );
}


const inputStyle = `
    w-full border border-gray-300 rounded px-3 py-2 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
`;