import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full flex flex-col gap-6 items-center justify-center text-center px-4 py-20 md:py-20 md:px-16 bg-gradient-to-b from-secondary to-background">
        <Badge variant="outline" className='rounded-full px-4 py-1 bg-background'>Welcome 🎊</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-[920px] ">Welcome to Clipboard!</h1>
        <p className="max-w-[920px] ">Effortlessly manage your tasks and stay on top of your to-do list with Clipboard. Our intuitive platform is designed to help you boost productivity, organize projects, and streamline your workflow—all in one place.</p>
        <Link href='/tasks'><Button>Get Started <ChevronRight className="ml-2 h-4 w-4"/></Button></Link>
      </div>
    </>
  );
}
