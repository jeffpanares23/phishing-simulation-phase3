
import { Assessment, CategoryType } from './types';

export const ASSESSMENTS: Assessment[] = [
  // CATEGORY 1: MULTIPLE CHOICE (1-5)
  {
    id: 1,
    category: CategoryType.MULTIPLE_CHOICE,
    question: "You receive an email from a known vendor requesting an urgent bank detail update for pending invoices. The tone seems slightly unusual. What is your FIRST action?",
    choices: [
      { id: 'a', text: "Reply to the email immediately to confirm the request." },
      { id: 'b', text: "Verify the request via a different, pre-established channel (like a phone call)." },
      { id: 'c', text: "Ignore the email and wait for a second follow-up." }
    ],
    correctAnswer: 'b',
    explanation: "Verification via a separate 'out-of-band' channel is the most secure response when tone or requests change."
  },
  {
    id: 2,
    category: CategoryType.MULTIPLE_CHOICE,
    question: "You realize you accidentally clicked a link and entered your work credentials on a suspicious site 10 minutes ago. What should you do?",
    choices: [
      { id: 'a', text: "Immediately change your password and report the incident to IT." },
      { id: 'b', text: "Wait to see if there's any unusual activity on your account first." },
      { id: 'c', text: "Delete your browser history to remove any traces of the site." }
    ],
    correctAnswer: 'a',
    explanation: "Speed is critical. Reporting immediately allows IT to rotate tokens and monitor for lateral movement."
  },
  {
    id: 3,
    category: CategoryType.MULTIPLE_CHOICE,
    question: "You receive a suspected phishing email in your PERSONAL inbox while using a COMPANY-issued mobile phone. Where should you report it?",
    choices: [
      { id: 'a', text: "Forward it to your company's IT security team." },
      { id: 'b', text: "Use the built-in 'Report Phishing' tool of your personal email provider." },
      { id: 'c', text: "Post a screenshot on social media to warn your friends." }
    ],
    correctAnswer: 'b',
    explanation: "Personal incidents should be reported to the relevant provider (Gmail, Outlook, etc.) or national CERT, not work IT, unless work data was compromised."
  },
  {
    id: 4,
    category: CategoryType.MULTIPLE_CHOICE,
    question: "A high-ranking executive sends an email asking you to perform a 'confidential task' and insists you don't mention it to your manager. What is the correct response?",
    choices: [
      { id: 'a', text: "Follow the instructions quietly to prove your loyalty." },
      { id: 'b', text: "Escalate the request to the Security Operations Center (SOC) or IT." },
      { id: 'c', text: "Ask the executive to send the request to your manager instead." }
    ],
    correctAnswer: 'b',
    explanation: "Pressure and secrecy are major red flags of 'Whaling' or CEO fraud. Reporting protects the organization."
  },
  {
    id: 5,
    category: CategoryType.MULTIPLE_CHOICE,
    question: "What is the primary reason the company encourages reporting 'safe' emails that just 'look' suspicious?",
    choices: [
      { id: 'a', text: "To test if IT is paying attention." },
      { id: 'b', text: "To help the security system learn and block similar patterns for everyone." },
      { id: 'c', text: "To meet a monthly reporting quota for compliance." }
    ],
    correctAnswer: 'b',
    explanation: "Every report feeds threat intelligence, potentially stopping an attack before it reaches more vulnerable targets."
  },

  // CATEGORY 2: TRUE OR FALSE (6-10)
  {
    id: 6,
    category: CategoryType.TRUE_FALSE,
    question: "Reporting a phishing email late is significantly better than never reporting it at all.",
    correctAnswer: true,
    explanation: "Containment is possible even after a breach. Silence is the attacker's greatest ally."
  },
  {
    id: 7,
    category: CategoryType.TRUE_FALSE,
    question: "If you clicked a link but did not enter any data or download a file, you do not need to notify IT.",
    correctAnswer: false,
    explanation: "Even a click can trigger 'drive-by' downloads or confirm to attackers that your email address is active and 'clickable'."
  },
  {
    id: 8,
    category: CategoryType.TRUE_FALSE,
    question: "Phishing attackers often use relevance and timing (like tax season or HR updates) to override a user's natural caution.",
    correctAnswer: true,
    explanation: "Contextual phishing is highly effective because it aligns with expected life or work events."
  },
  {
    id: 9,
    category: CategoryType.TRUE_FALSE,
    question: "Security teams prefer that you delete a suspicious email rather than reporting it to avoid 'clogging' their system.",
    correctAnswer: false,
    explanation: "Security teams need the metadata from the email to create blocks. Deleting without reporting removes evidence."
  },
  {
    id: 10,
    category: CategoryType.TRUE_FALSE,
    question: "The speed of your response is more important for organizational safety than your ability to perfectly identify every technical flaw in an email.",
    correctAnswer: true,
    explanation: "Action saves the network. You don't need to be a forensic expert to report something that 'feels off'."
  },

  // CATEGORY 3: REAL-LIFE PHISHING EMAILS (11-15)
  {
    id: 11,
    category: CategoryType.EMAIL_SIMULATION,
    question: "Analyze this Microsoft 365 alert. What is the correct response?",
    correctAnswer: 'Report',
    explanation: "The sender domain 'microsoft-security-alert.com' is unofficial. The link points to a non-Microsoft auth page.",
    emailData: {
      sender: "Microsoft Security <no-reply@microsoft-security-alert.com>",
      recipient: "User <user@enterprise.com>",
      subject: "Urgent: Your Account is Scheduled for Deactivation",
      body: `Dear User,

Our system has detected unusual login attempts from an unrecognized IP address in a restricted region. To protect your security, your Microsoft 365 account has been temporarily flagged for deactivation.

Deactivation will occur in: 4 hours.

Please verify your identity immediately to prevent loss of access to your emails, files, and calendar. Failure to act will result in permanent account suspension per company policy.`,
      displayLink: "https://portal.office.com/verify-identity",
      hoverLink: "http://update-office-login.net/auth/v2/secure-token-8821",
      signature: "Global Security Team\nMicrosoft Identity Services",
      disclaimer: "This is an automated message. Please do not reply. For your protection, Microsoft will never ask for your password via email."
    }
  },
  {
    id: 12,
    category: CategoryType.EMAIL_SIMULATION,
    question: "An internal HR email arrives. Review it carefully. What is the correct action?",
    correctAnswer: 'Report',
    explanation: "The .zip attachment and the 'external' tag on an 'internal' email are major red flags.",
    emailData: {
      sender: "HR Benefits <hr-noreply@external-mail-service.org>",
      recipient: "All Staff <staff@enterprise.com>",
      subject: "IMPORTANT: Updated Q4 Benefits Package & Bonus Structure",
      body: `Hello Team,

We are excited to announce the new benefits package for the upcoming quarter. This includes significant changes to the healthcare plan and the new performance-based bonus structure.

Due to the sensitive nature of this information, the details have been encrypted in the attached file. Please review the document and sign the acknowledgment form by the end of the business day to ensure your benefits are processed correctly.

Password for the file: Company2024!`,
      attachment: { name: "Q4_Benefits_Final.zip", type: "application/zip" },
      signature: "Human Resources Department\nEnterprise Corp",
      disclaimer: "Confidentiality Notice: This message is intended only for the use of the individual or entity to which it is addressed."
    }
  },
  {
    id: 13,
    category: CategoryType.EMAIL_SIMULATION,
    question: "You receive this from your bank to your personal email. What happens next?",
    correctAnswer: 'Report to Bank',
    explanation: "Banks rarely send direct login links for 'fraud alerts' and the sender address is generic.",
    emailData: {
      sender: "Alert Center <notifications@secure-banking-portal.io>",
      recipient: "Customer <private-email@gmail.com>",
      subject: "Security Alert: Possible Fraudulent Transaction",
      body: `Dear Valued Customer,

A transaction of $1,249.99 at 'Global Electronics Store' was attempted using your debit card ending in 4492. As this is outside your normal spending patterns, we have put a hold on your card.

If you did NOT authorize this transaction, click below to secure your account immediately. If no action is taken within 1 hour, the transaction will be processed and the hold will be lifted.`,
      displayLink: "https://yourbank.com/secure/fraud-protection",
      hoverLink: "https://bit.ly/bank-fraud-verify-302",
      signature: "Fraud Prevention Department\nSecure Bank International",
      disclaimer: "Your security is our priority. We will never ask for your full PIN or password."
    }
  },
  {
    id: 14,
    category: CategoryType.EMAIL_SIMULATION,
    question: "A vendor invoice is sent to your department. How should this be handled?",
    correctAnswer: 'Verify/Report',
    explanation: "The 'New Banking Details' note combined with a different sender address than usual requires external verification.",
    emailData: {
      sender: "Accounts Payable <accounting@vendor-supplies-inc.co>",
      recipient: "Finance Team <finance@enterprise.com>",
      subject: "Invoice #INV-99201 - Overdue Notice",
      body: `Greetings,

Our records show that Invoice #INV-99201 is now 15 days overdue. Please find the attached copy for your reference.

PLEASE NOTE: We have recently updated our banking details. Please ensure all future wire transfers are sent to the new account listed on page 2 of the attached PDF to avoid payment delays.

We appreciate your prompt attention to this matter.`,
      attachment: { name: "INV_99201_Vendor.pdf", type: "application/pdf" },
      signature: "Elena Rodriguez\nAccounts Manager, Vendor Supplies Inc.",
      disclaimer: "This email and any files transmitted with it are confidential and intended solely for the use of the individual."
    }
  },
  {
    id: 15,
    category: CategoryType.EMAIL_SIMULATION,
    question: "A high-urgency email from the CEO. What's the right move?",
    correctAnswer: 'Escalate',
    explanation: "This is a textbook 'Business Email Compromise' (BEC) scam. Urgent, secretive, and asks for financial tasks.",
    emailData: {
      sender: "Chief Executive Officer <ceo.office.global@gmail.com>",
      recipient: "Junior Accountant <junior.acc@enterprise.com>",
      subject: "Urgent Task - Confidential",
      body: `Hi,

I'm currently tied up in a high-stakes client meeting and cannot be disturbed. I need a quick favor.

I need you to process a purchase of 10 Apple Gift Cards ($100 each) for some VIP clients we are hosting tonight. Send the codes to me via this email thread as soon as possible. I will reimburse you and provide the accounting codes once I'm out of the meeting.

Don't call my office line as my phone is on silent. Rely on email only for now. Thanks.`,
      signature: "Best regards,\nMark Harrison\nCEO, Enterprise Corp",
      disclaimer: "Sent from my iPhone"
    }
  }
];
