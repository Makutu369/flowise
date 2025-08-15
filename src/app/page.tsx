import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Heart,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Empower Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cycle
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Track, understand, and embrace your menstrual health with
              confidence. Join thousands of women taking control of their
              wellness journey.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent/10 blur-3xl"></div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              About Our Mission
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We believe every woman deserves to understand her body and feel
              empowered in her health journey. Our app is built by women, for
              women.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">
                  Empowerment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Knowledge is power. We provide insights that help you
                  understand your body's natural rhythms and patterns.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your health data is deeply personal. We use end-to-end
                  encryption and never share your information without consent.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a supportive community of women sharing experiences,
                  tips, and encouragement on their wellness journeys.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 rounded-2xl bg-muted p-8 text-center">
            <blockquote className="text-lg italic text-muted-foreground">
              "This app has completely changed how I understand my body. I feel
              more in control and confident about my health than ever before."
            </blockquote>
            <cite className="mt-4 block text-sm font-medium text-foreground">
              — Sarah M., App User
            </cite>
          </div>
        </div>
      </section>

      {/* App Expectations Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              What to Expect
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover the powerful features that make period tracking simple,
              insightful, and empowering.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Smart Cycle Tracking
                  </h3>
                  <p className="text-muted-foreground">
                    Effortlessly log your periods, symptoms, and moods. Our AI
                    learns your patterns to provide accurate predictions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Health Insights
                  </h3>
                  <p className="text-muted-foreground">
                    Get personalized insights about your cycle, fertility
                    windows, and overall reproductive health trends.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Smart Reminders
                  </h3>
                  <p className="text-muted-foreground">
                    Never miss important dates with gentle, customizable
                    reminders for periods, appointments, and medication.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-80 w-48 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                  <div className="h-full w-full rounded-3xl bg-card flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground px-4">
                        Beautiful, intuitive interface designed for daily use
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-accent animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-primary/60 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
