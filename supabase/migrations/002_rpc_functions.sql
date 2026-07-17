-- ─────────────────────────────────────────────────────────────────────────────
-- RPC Functies – aangeroepen vanuit de webhook-handler
-- ─────────────────────────────────────────────────────────────────────────────

-- Verhoog current_funding van een project na een succesvolle betaling
CREATE OR REPLACE FUNCTION increment_project_funding(
    p_project_id UUID,
    p_amount     DECIMAL
)
RETURNS VOID AS $$
BEGIN
    UPDATE projects
    SET current_funding = current_funding + p_amount
    WHERE id = p_project_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
