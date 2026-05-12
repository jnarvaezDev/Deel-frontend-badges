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

  const params = new URLSearchParams({
    name: `Deel Global Certification - ${tier}`,
    organizationName: "Deel",
    issueYear: new Date().getFullYear().toString(),
    issueMonth: (new Date().getMonth() + 1).toString(),
    credentialUrl: `${url}`,
    credentialId: id?.toString()
  });

  return `${baseUrl}&${params.toString()}`;
};