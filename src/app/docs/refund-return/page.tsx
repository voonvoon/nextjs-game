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
              <h4 className="text-lg font-semibold mb-2">Return and Refund Policy</h4>
              <p>
                Last updated: 13/10/2023
                <br />
                Thank you for shopping with Bean Collector. We take great pride in
                providing you with the variety of quality premium coffee beans. If,
                for any reason, you are not entirely satisfied with your purchase,
                we are here to help. Please read our return and refund policy carefully
                to understand your rights and obligations.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Returns</h4>
              <p>
                1. Eligibility for Returns: You may return your purchase within 7 days
                from the date of delivery. To be eligible for a return, your item must
                be in the same condition as when you received it, unused, and in its
                original packaging.
                <br />
                2. Return Process: To initiate a return, please contact our customer
                service team at <a href="mailto:contact@beancollectors.com">contact@beancollectors.com</a> or use the Whatsapp icon on
                our main website, with your order number, and a detailed reason for
                the return. Our team will guide you through the return process.
                <br />
                3. Return Shipping: You are responsible for the cost of return
                shipping. We recommend using a trackable shipping service to ensure
                the safe return of your item.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Refunds</h4>
              <p>
                1. Refund Eligibility: Once your returned item is received and
                inspected, we will send you an email to notify you that we have
                received your returned item. If it meets our return policy criteria,
                your refund will be processed.
                <br />
                2. Refund Processing Time: Refunds will be processed within 7 days of
                receiving the returned item. Please allow additional time for the
                refund to appear in your account, as processing times may vary by
                payment method and financial institutions.
                <br />
                3. Non-Refundable Items: We do not provide refunds for coffee beans
                that are in good condition and have not experienced any quality
                issues.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Cancellations</h4>
              <p>
                1. If you wish to cancel your order, please contact us as soon as
                possible. If your order has not been shipped, we will cancel it and
                provide a full refund. If the order has been shipped, you will need to
                follow the return process.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Damaged or Incorrect Items</h4>
              <p>
                1. In the rare event that you receive damaged, incorrect, expired, or
                poor-quality items, please contact our customer service team
                immediately. We will arrange for a replacement or a full refund,
                depending on your preference.
              </p>
            </div>

            <div className="mt-4 footer-doc-text">
              <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
              <p>
                If you have any questions or concerns regarding our return and refund
                policy, please contact us at <a href="mailto:contact@beancollectors.com">contact@beancollectors.com</a> or use the
                Whatsapp icon on our main website.
                <br />
                This return and refund policy is subject to change, and any updates
                will be posted on our website. Please check back periodically for the
                latest information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
