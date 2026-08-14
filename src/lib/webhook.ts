/**
 * n8n webhook client module.
 *
 * Forwards payloads to the configured n8n webhook URL with a 10-second timeout
 * using AbortController.
 */

export interface WebhookResponse {
  success: boolean;
  status?: number;
  message: string;
}

/**
 * Forwards a payload to the n8n webhook URL.
 *
 * - Uses AbortController with a 10-second timeout
 * - Returns success/failure with a typed response
 * - Clears timeout on success or completion
 */
export async function forwardToWebhook(payload: unknown): Promise<WebhookResponse> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      success: false,
      message: 'N8N_WEBHOOK_URL not configured',
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `Webhook returned HTTP ${response.status}`,
      };
    }

    return {
      success: true,
      status: response.status,
      message: 'Payload forwarded successfully',
    };
  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        message: 'Webhook request timed out after 10 seconds',
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown webhook error',
    };
  }
}
