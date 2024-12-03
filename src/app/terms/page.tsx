import { Card } from '@/components/ui/Card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Terms and Conditions for SMS Messages</h1>

          <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Consent to Receive Messages</h2>
              <p>
                By providing your phone number and agreeing to these terms, you consent to receive text messages
                from Shawn Pander and associated services. These messages may include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Updates about new music releases</li>
                <li>Concert and tour announcements</li>
                <li>Behind-the-scenes content</li>
                <li>Exclusive fan opportunities</li>
                <li>Other promotional messages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Message Frequency</h2>
              <p>
                You may receive up to 4 messages per month. Message frequency varies based on your
                preferences and engagement with our content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Message and Data Rates</h2>
              <p>
                Message and data rates may apply. Please consult your wireless service provider regarding
                their pricing plans. You are solely responsible for any message and data charges incurred.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Opt-Out Instructions</h2>
              <p>
                You can opt out of receiving messages at any time by:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Replying &quot;STOP&quot; to any message</li>
                <li>Contacting us through our website</li>
                <li>Emailing us at support@shawnpander.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Support Instructions</h2>
              <p>
                For support or questions about messages, you can:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Reply &quot;HELP&quot; to any message</li>
                <li>Email us at support@shawnpander.com</li>
                <li>Visit our website&apos;s contact page</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Privacy Policy</h2>
              <p>
                Your privacy is important to us. We will never sell, rent, or share your personal
                information with third parties without your explicit consent. For more information
                about how we handle your data, please visit our Privacy Policy page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify you of any
                changes by sending a text message and updating this page. Your continued use of our
                messaging service after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contact Information</h2>
              <p>
                If you have any questions about these terms, please contact us:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Email: support@shawnpander.com</li>
                <li>Phone: {process.env.NEXT_PUBLIC_SUPPORT_PHONE}</li>
                <li>Address: [Your Business Address]</li>
              </ul>
            </section>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <p className="text-sm text-white/60">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Terms and Conditions - SMS Messages | Shawn Pander',
  description: 'Terms and conditions for receiving SMS messages from Shawn Pander.',
  openGraph: {
    title: 'Terms and Conditions - SMS Messages',
    description: 'Terms and conditions for receiving SMS messages from Shawn Pander.',
    type: 'website'
  }
}