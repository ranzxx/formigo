import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Link,
  Tailwind,
} from '@react-email/components';

interface VerifyEmailProps {
  verificationUrl?: string;
  username: string;
}

const EmailVerification = (props: VerifyEmailProps) => {
  const {
    verificationUrl = "https://example.com/verify",
    username,
  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-white font-sans py-10">
          <Container className="mx-auto px-5 max-w-145">
            {/* Main content */}
            <Section className="text-center mb-8">
              <Text className="text-[28px] font-bold text-gray-800 mb-4 leading-[1.3]">
                Verify Your Email Address
              </Text>
              <Text className="text-[16px] text-gray-600 leading-normal mb-8">
                Thanks {username} for signin up! Please click the button below to verify your email address and
                complete your account setup.
              </Text>
            </Section>

            {/* Verification button */}
            <Section className="text-center mb-6">
              <Button
                href={verificationUrl}
                className="bg-blue-900 text-white px-8 py-4 text-[16px] font-medium rounded-[8px] box-border no-underline inline-block"
              >
                Verify Email
              </Button>
            </Section>

            {/* Alternative link */}
            <Section className="text-center mb-10">
              <Text className="text-[14px] text-gray-500 leading-[1.4]">
                If the button doesn't work, click this link:{" "}
                <Link
                  href={verificationUrl}
                  className="text-blue-900 underline"
                >
                  {verificationUrl}
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-6 mt-10">
              <Text className="text-[12px] text-gray-400 text-center leading-[1.4] m-0">
                © 2026 Formigo. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-400 text-center leading-[1.4] m-0 mt-2">
                123 Business Street, Suite 100, City, State 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;