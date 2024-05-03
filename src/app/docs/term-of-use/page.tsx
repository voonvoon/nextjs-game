"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="policy-container p-4 text-white">
            <div className="footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Welcome to Bean Collector
              </h4>
              <p>
                By using this website, you agree to comply with and be bound by
                the following terms and conditions of use. If you disagree with
                any part of these terms, please do not use our website.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Acceptance of Terms
              </h4>
              <p>
                By accessing and using this website, you acknowledge that you
                have read, understood, and agree to be bound by these Terms of
                Use. If you do not agree with any part of these terms, please do
                not use the website.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                User Responsibilities
              </h4>
              <ul className="list-disc pl-4">
                <li>
                  You must be of legal age to use this website in your
                  jurisdiction.
                </li>
                <li>
                  You are responsible for ensuring that your account information
                  is accurate and secure.
                </li>
                <li>
                  You agree not to engage in any illegal or unauthorized
                  activities on the website.
                </li>
              </ul>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Intellectual Property
              </h4>
              <ul className="list-disc pl-4">
                <li>
                  All content on this website, including text, images, and
                  logos, is owned by BC BEAN ENTERPRISE and is protected by
                  intellectual property laws.
                </li>
                <li>
                  You may not reproduce, distribute, or use our content without
                  explicit permission.
                </li>
              </ul>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Privacy Policy</h4>
              <p>
                Your use of this website is also governed by our Privacy Policy,
                which can be found{" "}
                <Link href="/privacy-policy" className="text-primary pointer">
                  privacy-policy
                </Link>
                .
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Payment and Refunds
              </h4>
              <p>
                Details regarding payment methods, pricing, and refund/return
                policies can be found in our Refund and Return Policy.
                <Link
                  href="/refund-return-policy"
                  className="text-primary pointer"
                >
                  Refund & return
                </Link>
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Limitation of Liability
              </h4>
              <ul className="list-disc pl-4">
                <li>
                  We do our best to provide accurate and up-to-date information,
                  but we are not responsible for any errors or omissions on the
                  website.
                </li>
                <li>
                  BC BEAN ENTERPRISE is not liable for any damages resulting
                  from the use of this website.
                </li>
              </ul>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Termination</h4>
              <p>
                We reserve the right to terminate or suspend user accounts that
                violate these terms or for any other reason at our discretion.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Changes to Terms</h4>
              <p>
                We may change these Terms of Use at any time. We will post the
                updated terms on the website, and your continued use of the site
                constitutes your acceptance of these changes.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">
                Contact Information
              </h4>
              <p>
                If you have any questions or concerns about these terms, please
                contact us at{" "}
                <a href="mailto:contact@beancollectors.com">
                  contact@beancollectors.com
                </a>{" "}
                or click on the Whatsapp icon on our website main page to chat
                with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
