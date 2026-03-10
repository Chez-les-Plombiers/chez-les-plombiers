"use client";

import Script from "next/script";

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          strategy="lazyOnload"
        />
        <div
          className="elfsight-app-00d08559-836c-470d-bfba-03492cc04c0d"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}
