import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Home, Search, Calculator } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Sorry, we couldn't find the health calculator or page you're looking for.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Popular Health Calculators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link href="/tools/general-health/bmi-calculator">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="mr-2 h-4 w-4" />
                    BMI Calculator
                  </Button>
                </Link>
                <Link href="/tools/heart-health/blood-pressure-calculator">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="mr-2 h-4 w-4" />
                    Blood Pressure Calculator
                  </Button>
                </Link>
                <Link href="/tools/sleep-health/sleep-calculator">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="mr-2 h-4 w-4" />
                    Sleep Calculator
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                <Home className="mr-2 h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Browse All Tools
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}