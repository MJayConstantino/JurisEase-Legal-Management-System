import { redirect } from "next/navigation";
// import { notFound } from "next/navigation";
import { getMatterById } from "@/actions/matters";
import { fetchUsersAction } from "@/actions/users";
import { MatterPage } from "@/components/matters/matterPage";

// UUID validation
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const { matterId } = await params;

  if (!UUID_REGEX.test(matterId)) {
    return {
      title: "Matter Not Found | JurisEase",
    };
  }

  const matter = await getMatterById(matterId);

  if (!matter) {
    return {
      title: "Matter Not Found | JurisEase",
    };
  }

  return {
    title: `${matter.name} | JurisEase`,
    description: `Details for matter ${matter.matter_id}: ${matter.name}`,
  };
}

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const { matterId } = await params;

  if (!UUID_REGEX.test(matterId)) {
    redirect(
      `/error?message=${encodeURIComponent(
        "Invalid matter ID"
      )}&cause=${encodeURIComponent(
        "The provided matter ID format is invalid"
      )}`
    );
    // notFound();
  }

  const matter = await getMatterById(matterId);
  const users = await fetchUsersAction();

  if (!matter) {
    redirect(
      `/error?message=${encodeURIComponent(
        "Matter not found"
      )}&cause=${encodeURIComponent(
        `Matter with ID ${matterId} does not exist`
      )}&code=404`
    );
    // notFound();
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <MatterPage matter={matter} users={users} />
    </div>
  );
}
