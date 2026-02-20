// import Link from "next/link";
// import {
//   CheckSquare,
//   Zap,
//   Shield,
//   BarChart3,
//   Bell,
//   Users,
//   ArrowRight,
//   Star,
//   CheckCircle2,
//   Sparkles,
//   CalendarDays,
//   SlidersHorizontal,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Navbar } from "@/components/layout/navbar";
// import { Separator } from "@/components/ui/separator";

// // ─── Data ──────────────────────────────────────────────────────────────────

// const features = [
//   {
//     icon: Zap,
//     title: "Lightning Fast",
//     description:
//       "Create, update, and manage tasks instantly with a snappy, responsive interface built for speed.",
//   },
//   {
//     icon: SlidersHorizontal,
//     title: "Smart Filtering",
//     description:
//       "Filter by status, search by title, and sort by priority or due date to find what matters.",
//   },
//   {
//     icon: CalendarDays,
//     title: "Due Date Tracking",
//     description:
//       "Set deadlines, get visual overdue indicators, and never miss an important task again.",
//   },
//   {
//     icon: Shield,
//     title: "Secure by Default",
//     description:
//       "JWT authentication with rotating refresh tokens keeps your data private and protected.",
//   },
//   {
//     icon: BarChart3,
//     title: "Priority Levels",
//     description:
//       "Assign Low, Medium, High, or Urgent priority to tasks and focus on what truly matters.",
//   },
//   {
//     icon: Bell,
//     title: "Instant Feedback",
//     description:
//       "Real-time toast notifications for every action so you always know whats happening.",
//   },
// ];

// const steps = [
//   {
//     step: "01",
//     title: "Create your account",
//     description: "Sign up in seconds — no credit card required.",
//   },
//   {
//     step: "02",
//     title: "Add your tasks",
//     description:
//       "Create tasks with titles, descriptions, priorities, and due dates.",
//   },
//   {
//     step: "03",
//     title: "Stay organized",
//     description: "Filter, search, and track progress from your dashboard.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Priya Sharma",
//     role: "Product Manager",
//     avatar: "PS",
//     content:
//       "TaskFlow completely changed how I manage my daily work. The priority system is a game changer.",
//   },
//   {
//     name: "Alex Johnson",
//     role: "Software Developer",
//     avatar: "AJ",
//     content:
//       "Clean UI, fast performance, and the dark mode is beautiful. I use this every single day.",
//   },
//   {
//     name: "Rohan Verma",
//     role: "Freelancer",
//     avatar: "RV",
//     content:
//       "Finally a task app that doesn't overwhelm me. Simple, focused, and works perfectly.",
//   },
// ];

// const pricingPerks = [
//   "Unlimited tasks",
//   "Priority levels & due dates",
//   "Advanced filtering & search",
//   "Dark & light theme",
//   "Secure JWT authentication",
//   "Mobile responsive design",
// ];

// // ─── Page ──────────────────────────────────────────────────────────────────

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* ── Hero ── */}
//       <section className="relative overflow-hidden">
//         {/* Background gradient blobs */}
//         <div className="pointer-events-none absolute inset-0 -z-10">
//           <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
//           <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
//         </div>

//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
//           <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5">
//             <Sparkles className="h-3.5 w-3.5" />
//             Now with AI-powered task suggestions
//           </Badge>

//           <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
//             Manage tasks with{" "}
//             <span className="relative">
//               <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
//                 clarity & focus
//               </span>
//             </span>
//           </h1>

//           <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
//             TaskFlow helps you capture, organize, and complete tasks
//             effortlessly. Stay on top of priorities and deadlines — from any
//             device.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button size="lg" asChild className="h-12 px-8 text-base">
//               <Link href="/register">
//                 Start for free
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               asChild
//               className="h-12 px-8 text-base"
//             >
//               <Link href="/login">Sign in to dashboard</Link>
//             </Button>
//           </div>

//           <p className="mt-4 text-sm text-muted-foreground">
//             No credit card required · Free forever
//           </p>

//           {/* Hero mockup card */}
//           <div className="mt-16 mx-auto max-w-3xl">
//             <div className="rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden">
//               {/* Fake browser bar */}
//               <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/30">
//                 <div className="flex gap-1.5">
//                   <div className="h-3 w-3 rounded-full bg-red-400" />
//                   <div className="h-3 w-3 rounded-full bg-yellow-400" />
//                   <div className="h-3 w-3 rounded-full bg-green-400" />
//                 </div>
//                 <div className="mx-auto text-xs text-muted-foreground bg-background rounded-md px-3 py-1 border border-border/60">
//                   taskflow.app/dashboard
//                 </div>
//               </div>
//               {/* Dashboard preview */}
//               <div className="p-6 space-y-3 bg-background">
//                 <div className="flex items-center justify-between mb-4">
//                   <p className="font-semibold text-sm">My Tasks</p>
//                   <Badge variant="secondary" className="text-xs">
//                     12 tasks
//                   </Badge>
//                 </div>
//                 {[
//                   {
//                     title: "Design new landing page",
//                     priority: "HIGH",
//                     status: "IN_PROGRESS",
//                     color: "text-orange-500",
//                   },
//                   {
//                     title: "Review pull requests",
//                     priority: "URGENT",
//                     status: "PENDING",
//                     color: "text-red-500",
//                   },
//                   {
//                     title: "Update documentation",
//                     priority: "MEDIUM",
//                     status: "COMPLETED",
//                     color: "text-blue-500",
//                   },
//                   {
//                     title: "Write unit tests",
//                     priority: "LOW",
//                     status: "PENDING",
//                     color: "text-green-500",
//                   },
//                 ].map((task, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card hover:bg-muted/30 transition-colors"
//                   >
//                     <CheckCircle2
//                       className={`h-4 w-4 shrink-0 ${
//                         task.status === "COMPLETED"
//                           ? "text-green-500 fill-green-500"
//                           : "text-muted-foreground"
//                       }`}
//                     />
//                     <span
//                       className={`flex-1 text-sm text-left ${
//                         task.status === "COMPLETED"
//                           ? "line-through text-muted-foreground"
//                           : ""
//                       }`}
//                     >
//                       {task.title}
//                     </span>
//                     <Badge
//                       variant="outline"
//                       className={`text-xs shrink-0 ${task.color}`}
//                     >
//                       {task.priority}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Separator />

//       {/* ── Features ── */}
//       <section id="features" className="py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-4">
//               Features
//             </Badge>
//             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
//               Everything you need to stay productive
//             </h2>
//             <p className="text-muted-foreground max-w-xl mx-auto">
//               Powerful features wrapped in a clean, distraction-free interface.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {features.map((feature) => (
//               <Card
//                 key={feature.title}
//                 className="group border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300"
//               >
//                 <CardContent className="p-6">
//                   <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
//                     <feature.icon className="h-5 w-5" />
//                   </div>
//                   <h3 className="font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-sm text-muted-foreground leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Separator />

//       {/* ── How it works ── */}
//       <section id="how-it-works" className="py-24 bg-muted/20">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-4">
//               How it works
//             </Badge>
//             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
//               Up and running in 3 steps
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
//             {/* Connector line */}
//             <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-border" />

//             {steps.map((step) => (
//               <div key={step.step} className="text-center relative">
//                 <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl font-bold shadow-lg">
//                   {step.step}
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
//                 <p className="text-muted-foreground text-sm">
//                   {step.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Separator />

//       {/* ── Testimonials ── */}
//       <section id="testimonials" className="py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-4">
//               Testimonials
//             </Badge>
//             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
//               Loved by productive people
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {testimonials.map((t) => (
//               <Card
//                 key={t.name}
//                 className="border-border/60 hover:shadow-md transition-shadow duration-300"
//               >
//                 <CardContent className="p-6">
//                   {/* Stars */}
//                   <div className="flex gap-0.5 mb-4">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         className="h-4 w-4 fill-yellow-400 text-yellow-400"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-muted-foreground leading-relaxed mb-6">
//                     {t.content}
//                   </p>
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
//                       {t.avatar}
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold">{t.name}</p>
//                       <p className="text-xs text-muted-foreground">{t.role}</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Separator />

//       {/* ── CTA ── */}
//       <section className="py-24 bg-muted/20">
//         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
//           <div className="rounded-3xl border border-border/60 bg-card p-12 shadow-xl relative overflow-hidden">
//             <div className="pointer-events-none absolute inset-0 -z-10">
//               <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
//               <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
//             </div>

//             <Badge variant="secondary" className="mb-6">
//               <Sparkles className="h-3.5 w-3.5 mr-1" />
//               Free forever
//             </Badge>
//             <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
//               Ready to get organized?
//             </h2>
//             <p className="text-muted-foreground max-w-xl mx-auto mb-8">
//               Join thousands of people using TaskFlow to take control of their
//               day. Everything included, no subscriptions needed.
//             </p>

//             {/* Perks */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-sm mx-auto mb-10 text-left">
//               {pricingPerks.map((perk) => (
//                 <div key={perk} className="flex items-center gap-2 text-sm">
//                   <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
//                   <span>{perk}</span>
//                 </div>
//               ))}
//             </div>

//             <Button size="lg" asChild className="h-12 px-10 text-base">
//               <Link href="/register">
//                 Create free account
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* ── Footer ── */}
//       <footer className="border-t border-border/40 py-8">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-2 font-semibold">
//             <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
//               <CheckSquare className="h-3.5 w-3.5" />
//             </div>
//             TaskFlow
//           </div>
//           <p className="text-sm text-muted-foreground">
//             © {new Date().getFullYear()} TaskFlow. Built with Next.js & ❤️
//           </p>
//           <div className="flex items-center gap-4 text-sm text-muted-foreground">
//             <Link
//               href="/login"
//               className="hover:text-foreground transition-colors"
//             >
//               Sign in
//             </Link>
//             <Link
//               href="/register"
//               className="hover:text-foreground transition-colors"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

export { default } from './(marketing)/page';
