import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RequireAdmin } from "@/components/admin/RequireAdmin";

import Home from "@/pages/Home";

const About = lazy(() => import("@/pages/About"));
const Skills = lazy(() => import("@/pages/Skills"));
const Services = lazy(() => import("@/pages/Services"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const BookMe = lazy(() => import("@/pages/BookMe"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Faq = lazy(() => import("@/pages/Faq"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminOverview = lazy(() => import("@/pages/admin/Overview"));
const AdminProjectsList = lazy(() => import("@/pages/admin/projects/List"));
const AdminProjectForm = lazy(() => import("@/pages/admin/projects/Form"));
const AdminProductsList = lazy(() => import("@/pages/admin/products/List"));
const AdminProductForm = lazy(() => import("@/pages/admin/products/Form"));
const AdminBlogList = lazy(() => import("@/pages/admin/blog/List"));
const AdminBlogForm = lazy(() => import("@/pages/admin/blog/Form"));
const AdminServicesList = lazy(() => import("@/pages/admin/services/List"));
const AdminServiceForm = lazy(() => import("@/pages/admin/services/Form"));
const AdminTestimonialsList = lazy(() => import("@/pages/admin/testimonials/List"));
const AdminTestimonialForm = lazy(() => import("@/pages/admin/testimonials/Form"));
const AdminBookings = lazy(() => import("@/pages/admin/Bookings"));
const AdminMessages = lazy(() => import("@/pages/admin/Messages"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/skills", element: <Skills /> },
      { path: "/services", element: <Services /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:slug", element: <ProjectDetail /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:slug", element: <ProductDetail /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetail /> },
      { path: "/testimonials", element: <Testimonials /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/book-me", element: <BookMe /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
      { path: "/faq", element: <Faq /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: <RequireAdmin />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "projects", element: <AdminProjectsList /> },
          { path: "projects/new", element: <AdminProjectForm /> },
          { path: "projects/:id/edit", element: <AdminProjectForm /> },
          { path: "products", element: <AdminProductsList /> },
          { path: "products/new", element: <AdminProductForm /> },
          { path: "products/:id/edit", element: <AdminProductForm /> },
          { path: "blog", element: <AdminBlogList /> },
          { path: "blog/new", element: <AdminBlogForm /> },
          { path: "blog/:id/edit", element: <AdminBlogForm /> },
          { path: "services", element: <AdminServicesList /> },
          { path: "services/new", element: <AdminServiceForm /> },
          { path: "services/:id/edit", element: <AdminServiceForm /> },
          { path: "testimonials", element: <AdminTestimonialsList /> },
          { path: "testimonials/new", element: <AdminTestimonialForm /> },
          { path: "testimonials/:id/edit", element: <AdminTestimonialForm /> },
          { path: "bookings", element: <AdminBookings /> },
          { path: "messages", element: <AdminMessages /> },
        ],
      },
    ],
  },
]);
