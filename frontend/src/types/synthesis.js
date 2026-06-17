/**
 * @typedef {"strong" | "moderate" | "weak" | string} Consensus
 *
 * @typedef {Object} Synthesis
 * @property {string} theme
 * @property {number} supporting_claims
 * @property {Consensus} consensus
 * @property {string[]} claims
 *
 * @typedef {Object} AnalysisResponse
 * @property {import("./claim").Claim[]} claims
 * @property {Synthesis} synthesis
 * @property {string} research_brief
 */

export {};
