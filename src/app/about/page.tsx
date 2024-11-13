"use client";
import {  Code2 } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Code2 className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">About Code Capture</h1>
            <p className="text-lg text-muted-foreground">
              Create beautiful, shareable code snippets in seconds
            </p>
          </div>

          <div className="space-y-8">
            <section className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                What is Code Capture?
              </h2>
              <p className="text-muted-foreground">
                Code Capture is a modern, intuitive code snippet editor that
                helps developers share their code beautifully. Whether you&apos;re
                creating documentation, sharing on social media, or teaching
                others, Code Capture makes your code look professional.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Key Features</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-medium mb-2">Beautiful Themes</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from carefully crafted themes that make your code
                    stand out
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-medium mb-2">Easy Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Export as images or share directly to social media
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-medium mb-2">Language Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Syntax highlighting for all major programming languages
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-medium mb-2">Customization</h3>
                  <p className="text-sm text-muted-foreground">
                    Adjust padding, font size, and other visual settings
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
