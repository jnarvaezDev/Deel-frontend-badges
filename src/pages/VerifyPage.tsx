import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Verification = {
  name: string;
  email: string;
  score: number;
  tier: string;
  created_at: string;
  vb_validation_url: string;
};

const tierDisplayMap: Record<string, string> = {
  "Global Potential": "Global Potential 🌱",
  "Global Talent": "Global Talent ⭐",
  "Global Leader": "Global Leader 🚀",
  "Global Champion": "Global Champion 🏆",
};

const badgeMap: Record<string, string> = {
  "Global Potential": "/badges/potential.png",
  "Global Talent": "/badges/talent.png",
  "Global Leader": "/badges/leader.png",
  "Global Champion": "/badges/champion.png",
};

const VerifyPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<Verification | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/verify/${id}`);
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, [id]);

  if (!data) return <div className="p-10">Loading...</div>;

  const badgeImage = badgeMap[data.tier];

  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="deel-container grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Certified for global opportunities
          </h1>

          <p className="text-muted-foreground mb-6">
            This certification validates international work experience and global readiness.
          </p>
          <div className="text-xs text-muted-foreground mb-2">
            Deel Verified Credential
          </div>
          <div className="bg-muted p-6 rounded-xl mb-6">
            <p className="text-sm text-muted-foreground">Certified professional</p>
            <p className="text-lg font-semibold">{data.name}</p>

            <p className="mt-4 text-sm text-muted-foreground">Certification level</p>
            <p className="font-semibold">{tierDisplayMap[data.tier]}</p>

            <p className="mt-4 text-sm text-muted-foreground">Score</p>
            <p className="font-semibold">{data.score}</p>

            <p className="mt-4 text-sm text-muted-foreground">Issued</p>
            <p className="font-semibold">
              {new Date(data.created_at).toLocaleDateString()}
            </p>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-full"
            >
              Share on LinkedIn
            </a>

            {data.vb_validation_url && (
              <a
                href={data.vb_validation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold"
              >
                View official VirtualBadge credential
              </a>
            )}
          </div>

          <div className="text-green-600 font-semibold">
            ✔ Verified Certification
          </div>

        </div>

        {/* RIGHT */}

        <div className="flex justify-center">
          <img
            src={badgeImage}
            alt="Badge"
            className="w-[300px] md:w-[400px]"
          />

        </div>

      </div>
    </div>
  );
};

export default VerifyPage;