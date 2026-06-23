import { Building2, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ - SAMIN Việt Nam",
  description: "Liên hệ với SAMIN để được tư vấn thiết kế, thi công mái tôn và kết cấu thép nhà xưởng.",
};

export default function ContactPage() {
  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Contact Info */}
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-slate-900 ring-1 ring-slate-900/10 lg:w-1/2">
              <div className="absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.900),theme(colors.slate.900))] opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Thông Tin Liên Hệ</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Hãy để SAMIN đồng hành cùng bạn trong việc xây dựng và phát triển cơ sở hạ tầng công nghiệp vững chắc.
            </p>
            <dl className="mt-10 space-y-6 text-base leading-7 text-slate-300">
              <div className="flex gap-x-4 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
                <dt className="flex-none">
                  <span className="sr-only">Tên công ty</span>
                  <Building2 className="h-7 w-6 text-blue-400" aria-hidden="true" />
                </dt>
                <dd>
                  <strong className="text-white">CÔNG TY TNHH SAMIN</strong>
                  <br />
                  354/89/16 Phan Văn Trị, Phường Bình Lợi Trung
                  <br />
                  Thành phố Hồ Chí Minh, Việt Nam
                </dd>
              </div>
              <div className="flex gap-x-4 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors items-center">
                <dt className="flex-none">
                  <span className="sr-only">Hotline</span>
                  <Phone className="h-7 w-6 text-blue-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-blue-400 font-medium text-white transition-colors text-lg" href="tel:0919678693">
                    0919 678 693
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors items-center">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-blue-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-blue-400 font-medium text-white transition-colors" href="mailto:info@samin.vn">
                    info@samin.vn
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Contact Form */}
        <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
