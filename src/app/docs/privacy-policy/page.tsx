"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="policy-container p-4 text-white">
            <div className="footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Introduction</h4>
              <p>
                Welcome to Bean Collector ("we," "us," "our," or "Company"). At
                Bean Collector, we are committed to protecting your privacy and
                handling your personal information with care. This Privacy
                Policy outlines how we collect, use, disclose, and safeguard
                your information when you visit our website,{" "}
                <Link href="https://www.beancollectors.com">
                  https://www.beancollectors.com
                </Link>
                , or use our services.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Information We Collect
              </h4>
              <p>
                Personal Information: We may collect personally identifiable
                information, such as your name, email address, phone number,
                shipping address, and payment information when you make a
                purchase or create an account on our website.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                How We Use Your Information
              </h4>
              <ul className="list-disc pl-4">
                <li>
                  To process and fulfill your orders, including shipping and
                  customer support.
                </li>
                <li>
                  To personalize your experience on our website and provide
                  product recommendations.
                </li>
                <li>
                  To improve our website, products, and services based on your
                  feedback.
                </li>
                <li>
                  To send promotional emails, newsletters, and updates, which
                  you can opt-out of at any time.
                </li>
                <li>
                  To detect and prevent fraud, security breaches, and
                  unauthorized access.
                </li>
              </ul>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                How We Share Your Information
              </h4>
              <ul className="list-disc pl-4">
                <li>
                  With our trusted service providers, such as payment processors
                  and shipping companies, to facilitate the fulfillment of your
                  orders.
                </li>
                <li>
                  With legal authorities when required by law or to protect our
                  rights, privacy, safety, or property.
                </li>
              </ul>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Cookies and Tracking Technologies
              </h4>
              <p>
                Our website may use cookies and other tracking technologies to
                enhance your browsing experience. You can control cookies
                through your browser settings.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Security</h4>
              <p>
                We take reasonable measures to protect your personal
                information. However, please be aware that no method of
                transmission over the internet or electronic storage is entirely
                secure.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Your Rights</h4>
              <p>
                You have certain rights regarding your personal information,
                including the right to access, correct, or delete your data.
                Please email us at{" "}
                <a href="mailto:contact@beancollectors.com">
                  contact@beancollectors.com
                </a>{" "}
                to exercise these rights.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Changes to this Privacy Policy
              </h4>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <p>
                If you have any questions, concerns, or requests related to this
                Privacy Policy, please email us at{" "}
                <a href="mailto:contact@beancollectors.com">
                  contact@beancollectors.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
