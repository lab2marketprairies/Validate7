'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const ADMIN_USER_ID = 'user_39JNBjYkk78K3qb0WHwAaGRQnEU';
const REPO_OWNER = 'lab2marketprairies';
const REPO_NAME = 'Validate7';

export async function updateContent(filePath: string, data: any) {
  try {
    const { userId } = await auth();

    if (userId !== ADMIN_USER_ID) {
      return { success: false, error: 'Unauthorized: Admin access required.' };
    }

    const githubToken = process.env.GITHUB_PAT;
    if (!githubToken) {
      return { success: false, error: 'GitHub PAT is not configured.' };
    }

    // 1. Get the current file SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        // Don't cache this request to ensure we get the latest SHA
        cache: 'no-store'
      }
    );

    if (!getRes.ok) {
      const errorText = await getRes.text();
      console.error('Failed to fetch file from GitHub:', errorText);
      return { success: false, error: `Failed to access repository for ${filePath}.` };
    }

    const fileMeta = await getRes.json();
    const sha = fileMeta.sha;

    // 2. Format the new content as base64
    const newContentString = JSON.stringify(data, null, 4); // Use 4 spaces for better readability in generic JSONs
    const newContentEncoded = Buffer.from(newContentString).toString('base64');

    // 3. Update the file
    const putRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `cms: Update ${filePath} via Admin Dashboard`,
          content: newContentEncoded,
          sha: sha,
        }),
      }
    );

    if (!putRes.ok) {
      const errorText = await putRes.text();
      console.error('Failed to update file on GitHub:', errorText);
      return { success: false, error: `Failed to save changes to ${filePath}.` };
    }

    // Revalidate the entire app just in case (though Vercel rebuilds it anyway)
    revalidatePath('/', 'layout');

    return { success: true };
  } catch (err: any) {
    console.error('Error in updateContent:', err);
    return { success: false, error: err.message || 'Internal server error' };
  }
}
