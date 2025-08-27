import { Form, Head } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

// Komponen UI dari ShadCN
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Komponen fungsional dari starter pack
import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";

export default function Register() {
  return (
    <>
      <Head title="Register" />
      {/* 1. Struktur Layout Diletakkan Langsung di Sini */}
      <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12">
        <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
          {/* 2. Header Card Sesuai Tampilan Asli */}
          <CardHeader className="text-center">
            <img
              src="Logo KFA member of BioFarma 300x300-01.png"
              alt="Logo"
              className="mx-auto h-12 mb-4"
            />
            <CardTitle className="text-2xl font-bold">
              Selamat Datang Di Digikop!
            </CardTitle>
            <p className="text-gray-500 text-sm">
              Mohon Lengkapi data Anda untuk melanjutkan pendaftaran.
            </p>
          </CardHeader>

          <CardContent>
            {/* 3. Form dengan Fungsionalitas Modern */}
            <Form
              method="post"
              action={route("register")}
              disableWhileProcessing
              className="space-y-6"
            >
              {({ processing, errors }) => (
                <>
                  {/* Nama & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Asep Doe"
                        autoFocus
                        required
                      />
                      <InputError message={errors.name} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        required
                      />
                      <InputError message={errors.email} className="mt-1" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg pt-4 border-t">
                    Informasi Tambahan
                  </h3>

                  {/* Departemen & Jabatan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Departemen</Label>
                      <Input id="department" name="department" placeholder="IT" />
                      <InputError message={errors.department} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="position">Jabatan</Label>
                      <Input id="position" name="position" placeholder="Manager" />
                      <InputError message={errors.position} className="mt-1" />
                    </div>
                  </div>

                  {/* Nomor Telepon & Tanggal Lahir */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+62 812-3456-672"
                      />
                      <InputError message={errors.phone} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="birth_date">Tanggal Lahir</Label>
                      <Input id="birth_date" name="birth_date" type="date" />
                      <InputError message={errors.birth_date} className="mt-1" />
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Alam Tirta Lestari, Ciomas, Bogor"
                    />
                    <InputError message={errors.address} className="mt-1" />
                  </div>

                  {/* Syarat & Ketentuan */}
                  <p className="text-sm text-center text-gray-500">
                    Dengan mendaftar, saya menyetujui{" "}
                    <TextLink href="#">Syarat & Ketentuan</TextLink> dan{" "}
                    <TextLink href="#">Kebijakan Privasi</TextLink>.
                  </p>
                  
                  {/* Button */}
                  <div className="flex justify-between gap-4 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white"
                    >
                      Kembali ke Digikop
                    </Button>
                    <Button
                      type="submit"
                      className="w-1/2 bg-blue-600 hover:bg-blue-700"
                    >
                      {processing && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Selesaikan Pendaftaran
                    </Button>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{" "}
                    <TextLink href={route("login")}>Masuk</TextLink>
                  </div>
                </>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}