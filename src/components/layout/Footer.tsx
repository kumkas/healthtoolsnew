import * as React from "react"
import Link from "next/link"
import { TOOL_CATEGORIES, SITE_CONFIG } from "@/lib/constants"
import { Heart, Mail, Twitter, Facebook, Linkedin } from "lucide-react"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Professional-grade health calculators and medical tools. 
                Get instant, accurate health insights completely free.
              </p>
              
              {/* Newsletter Signup */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Health Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Health Categories</h3>
              <ul className="space-y-3">
                {TOOL_CATEGORIES.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tools */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Popular Tools</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/tools/general-health/bmi-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    BMI Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/heart-health/blood-pressure-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Blood Pressure Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/sleep-health/sleep-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Sleep Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/pregnancy-womens-health/due-date-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Due Date Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/nutrition/calorie-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Calorie Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tools/fitness/body-fat-calculator"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Body Fat Calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Health Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Medical Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright and Medical Disclaimer */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Not intended as medical advice. Consult healthcare providers for medical decisions.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/${SITE_CONFIG.social.twitter.replace('@', '')}`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`https://facebook.com/${SITE_CONFIG.social.facebook}`}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }