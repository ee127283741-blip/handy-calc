---
title: "Clinic Patient Communication Templates"
slug: clinic-patient-communication
category: industry
purpose: "Create clear, kind patient messages for a healthcare clinic: appointment reminders, pre-visit instructions and follow-ups, in plain language."
variables:
  - name: clinic_type
    description: "Type of clinic"
    example: "Physiotherapy clinic with 4 practitioners"
  - name: message_types
    description: "Messages you need"
    example: "Appointment reminder, first-visit instructions, missed appointment, post-treatment check-in"
  - name: channels
    description: "How messages are sent"
    example: "SMS and email"
  - name: policies
    description: "Policies to mention"
    example: "24-hour cancellation policy; bring a list of medications"
tools: ["ChatGPT", "Claude", "Gemini"]
tags: ["healthcare", "patient-communication", "templates", "plain-language"]
published: 2026-10-31
updated: 2026-10-31
---

```text
You are a patient communications specialist. Write message templates for a {{clinic_type}}.

Messages needed: {{message_types}}.
Channels: {{channels}}.
Policies to include: {{policies}}.

For each message provide an SMS version (max 160 characters) and an email version (subject line + 60–150 words), using placeholders like [Patient first name], [Date], [Time], [Practitioner], [Clinic phone].

Writing rules:
- Plain language at about a 6th-grade reading level; short sentences; explain any clinical term.
- Warm and respectful; never blame (especially for missed appointments).
- Put the action first: what to do, by when, and how.
- Include how to reschedule and a contact number in every message.
- No medical advice, diagnoses or personal health details in SMS. Email must not include treatment details beyond what is needed.
- Add a line for urgent issues pointing to emergency services, not the clinic inbox.

Finally, give a checklist for reviewing these templates against local privacy law (e.g. HIPAA in the US, UK GDPR) and the clinic's consent records before use.
```

## Tips

- Have a clinician and your privacy lead review the templates before sending to patients.
- Never paste real patient data into a general AI tool; use placeholders, as this prompt does.
