# SKILL: rak-media — generative media

## When to use
When an agent needs assets for a piece: illustration, short video, TTS narration. Async, costly operations.

## Tools
| Tool | Purpose | Tier |
|---|---|---|
| `rak_media_generate_image` | image from a prompt → `{jobId, pollUrl}` | paid (credits) |
| `rak_media_generate_video` | video (duration 5/8/10, aspect 16:9/9:16/1:1) | paid (credits) |
| `rak_media_generate_song` | AI song from a prompt/lyrics (genre, vocals) → `{jobId, pollUrl}` | paid (credits) |
| `rak_media_storyboard` | panel storyboard from a scene description (prompts for image gen) | paid (credits) |
| `rak_media_tts` | narration (TTS) | paid (credits) |

## Tier / cost
`paid` only. Quota + credit enforcement per RAK pricing. Returns `{jobId, pollUrl}` — poll for the finished asset.

## Example prompts
- "Generate a cover image for this article, 16:9."
- "Make an 8s intro video, vertical 9:16."
