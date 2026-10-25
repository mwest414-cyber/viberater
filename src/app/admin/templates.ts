// Email templates for the admin page (Mark approved the wording in the Figma mock, Oct 25). Editable before sending.
// Rule: a message to the reported person never names the reporter or the place (only a few people are seen at a
// place at once, so the place alone could point to who reported them). The server route also refuses to send a
// message to the reported person that contains the reporter's name.

export type Template = "thanks" | "warning" | "ban";
export type Recipient = "reporter" | "reported";

export const reasonLabel: Record<string, string> = {
  harassment: "harassment",
  impersonation: "impersonation",
  spam: "spam or a fake account",
  other: "breaking the community guidelines",
  closed: "being permanently closed",
  wrong_info: "wrong info",
  inappropriate: "inappropriate content",
};

export const templatesFor: Record<Recipient, Template[]> = {
  reporter: ["thanks"],
  reported: ["warning", "ban"],
};

export const templateLabel: Record<Template, string> = { thanks: "thanks", warning: "warning", ban: "ban notice" };

export function fill(t: Template, p: { name: string; reason: string }): { subject: string; body: string } {
  const why = reasonLabel[p.reason] ?? p.reason;
  const name = p.name || "there";
  if (t === "thanks") {
    return {
      subject: "thanks for your report",
      body: `hey ${name}, thanks for flagging this. we looked into it and took action. if anything else happens, reply to this email.\n\nviberater`,
    };
  }
  if (t === "warning") {
    const nudge =
      p.reason === "harassment"
        ? "waves are meant to be a friendly hello, not pressure."
        : "please keep viberater friendly for everyone.";
    return {
      subject: "about your viberater account",
      body: `hey ${name}, someone reported your account for ${why}. ${nudge} if it happens again, we'll close your account.\n\nviberater`,
    };
  }
  return {
    subject: "your viberater account has been closed",
    body: `hey ${name}, we've closed your viberater account after reports of ${why}. if you think this is a mistake, reply to this email.\n\nviberater`,
  };
}
