import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

// Helper to generate realistic mockup contribution data if GITHUB_TOKEN is missing
function generateMockContributions() {
    const weeks = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setFullYear(today.getFullYear() - 1);

    // Roll back to the nearest Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    let currentDate = new Date(startDate);
    let total = 0;

    const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

    for (let w = 0; w < 53; w++) {
        const contributionDays = [];
        for (let d = 0; d < 7; d++) {
            // Generate a random commitment count with bias towards zero
            const countRand = Math.random();
            let count = 0;
            let color = colors[0];

            if (countRand > 0.8) {
                count = Math.floor(Math.random() * 4) + 1;
                color = colors[Math.min(count, colors.length - 1)];
                total += count;
            } else if (countRand > 0.65) {
                count = Math.floor(Math.random() * 2) + 1;
                color = colors[1];
                total += count;
            }

            contributionDays.push({
                color,
                contributionCount: count,
                date: currentDate.toISOString().split("T")[0],
                weekday: d,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push({ contributionDays });
    }

    return {
        totalContributions: total,
        weeks,
    };
}

export async function GET() {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username || !token) {
        console.warn("GITHUB_USERNAME or GITHUB_TOKEN environment variables are missing. Serving realistic mock contributions.");
        return NextResponse.json({
            provider: "mock",
            contributions: generateMockContributions(),
        });
    }

    const to = new Date();
    const from = new Date();
    from.setFullYear(to.getFullYear() - 1);

    const variables = {
        username,
        from: from.toISOString(),
        to: to.toISOString(),
    };

    try {
        const res = await fetch(GITHUB_GRAPHQL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query: QUERY, variables }),
            next: { revalidate: 3600 }, // Cache in Next.js for 1 hour
        });

        if (!res.ok) {
            throw new Error(`GitHub API returned status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.errors) {
            console.error("GitHub GraphQL errors:", data.errors);
            throw new Error("GitHub GraphQL query errors");
        }

        const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) {
            throw new Error("Invalid GitHub user response or calendar data");
        }

        return NextResponse.json({
            provider: "github",
            contributions: calendar,
        });
    } catch (err: any) {
        console.error("Failed to fetch from GitHub API:", err.message);
        // Fallback to mock data on error so site doesn't crash
        return NextResponse.json({
            provider: "fallback-mock",
            contributions: generateMockContributions(),
        });
    }
}
