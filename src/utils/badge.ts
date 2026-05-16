export const generateLinkedInUrl = ({
  tier,
  id,
  url
}: {
  tier: string;
  id: string;
  url: string;
}) => {
  const baseUrl =
    "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME";

  const APP_URL = import.meta.env.VITE_APP_URL;

  const tierExplanationMap: Record<string, string> = {
    "Global Leader":
      "According to an online assessment where the candidate stands by their own truth, Deel certifies that this professional has experience leading cross-border teams.",
    "Global Champion":
      "According to an online assessment where the candidate stands by their own truth, Deel certifies that this professional has experience working with cross-border teams.",
    "Global Talent":
      "According to an online assessment where the candidate stands by their own truth, Deel certifies that this professional has the necessary qualifications to work with cross-border teams.",
  };

  const mediaPathMap: Record<string, string> = {
    "Global Talent": "/badges/talent.png",
    "Global Champion": "/badges/champion.png",
    "Global Leader": "/badges/leader.png",
  };

  const mediaUrl = `${APP_URL ?? ""}${mediaPathMap[tier] ?? ""}`;

  const params = new URLSearchParams({
    name: `Deel Global Certification - ${tier}`,
    organizationName: "Deel",
    issueYear: new Date().getFullYear().toString(),
    issueMonth: (new Date().getMonth() + 1).toString(),
    credentialUrl: `${url}`,
    credentialId: id?.toString(),
    certUrl: `${url}`,
    certId: id?.toString(),
    certDesc: tierExplanationMap[tier] ?? "",
    media: mediaUrl,
  });

  return `${baseUrl}&${params.toString()}`;
};
