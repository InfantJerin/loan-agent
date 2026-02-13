import type { ExtractionResult, ExtractionSectionResult, CitationRef } from '@/types'

// Helper for building citations
function cit(id: string, label: string, sectionRef: string, page: number, snippet: string, level: CitationRef['level'] = 'single', bbox?: CitationRef['boundingBox']): CitationRef {
  return { id, label, sectionRef, pageNumber: page, snippetText: snippet, level, boundingBox: bbox ?? { x: 100 + Math.random() * 200, y: 80 + Math.random() * 600, width: 250 + Math.random() * 100, height: 18 } }
}

// ── Result 1: Meridian Holdings Credit Agreement (doc-1) ── COMPLETED / APPROVED

const meridianCASections: ExtractionSectionResult[] = [
  // Agreement Overview
  {
    sectionDefId: 'agreement-overview',
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T12:00:00Z',
    fields: [
      { fieldDefId: 'borrower_name', extractedValue: 'Meridian Holdings Corp', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-1', 'Preamble', 'Preamble, page 1', 1, 'WHEREAS, Meridian Holdings Corp., a Delaware corporation (the "Borrower")...')] },
      { fieldDefId: 'agent_bank', extractedValue: 'JPMorgan Chase Bank, N.A.', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-2', 'Administrative Agent', 'Section 9.01, page 142', 142, 'JPMorgan Chase Bank, N.A., in its capacity as Administrative Agent...')] },
      { fieldDefId: 'governing_law', extractedValue: 'State of New York', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-3', 'Governing Law', 'Section 10.14, page 165', 165, 'THIS AGREEMENT SHALL BE GOVERNED BY, AND CONSTRUED IN ACCORDANCE WITH, THE LAW OF THE STATE OF NEW YORK.')] },
      { fieldDefId: 'closing_date', extractedValue: 'March 15, 2024', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-4', 'Effective Date', 'Preamble, page 1', 1, 'dated as of March 15, 2024')] },
      { fieldDefId: 'effective_date', extractedValue: 'March 15, 2024', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-5', 'Effective Date', 'Section 4.01, page 52', 52, 'The obligations of the Lenders to make Loans...shall become effective on the date (the "Closing Date")...')] },
      { fieldDefId: 'agreement_type', extractedValue: 'Amended & Restated', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-6', 'Title', 'Cover Page, page 1', 1, 'AMENDED AND RESTATED CREDIT AGREEMENT')] },
      { fieldDefId: 'total_facility_amount', extractedValue: '$1,050,000,000', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [
        cit('cit-7a', 'Commitments Overview', 'Section 2.01, page 28', 28, 'The aggregate Commitments of all Lenders hereunder shall not exceed $1,050,000,000.', 'cross_reference'),
        cit('cit-7b', 'Commitment Schedule', 'Schedule 2.01, page 185', 185, 'Total Commitments: Revolving $750,000,000 + Term Loan A $250,000,000 + LC $50,000,000 = $1,050,000,000', 'cross_reference'),
      ] },
      { fieldDefId: 'number_of_facilities', extractedValue: '3', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-8', 'Facility Structure', 'Section 2.01, page 28', 28, 'The credit facilities established hereby consist of: (a) Revolving Credit Facility, (b) Term Loan A, and (c) Letter of Credit Facility.')] },
    ],
  },

  // Facility A: $750M Revolving Credit
  {
    sectionDefId: 'facility-terms',
    instanceLabel: 'Facility A: $750M Revolving Credit Facility',
    instanceIndex: 0,
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T13:00:00Z',
    fields: [
      { fieldDefId: 'facility_name', extractedValue: 'Revolving Credit Facility', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-10', 'Facility Name', 'Section 2.01(a), page 28', 28, '"Revolving Credit Facility" means the revolving credit facility established pursuant to this Section 2.01(a).')] },
      { fieldDefId: 'facility_type', extractedValue: 'Revolving Credit', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-11', 'Facility Type', 'Section 2.01(a), page 28', 28, 'revolving credit facility')] },
      { fieldDefId: 'commitment_amount', extractedValue: '$750,000,000', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-12', 'Commitment', 'Section 2.01(a), page 28', 28, 'aggregate principal amount not to exceed $750,000,000 (the "Revolving Credit Commitment")', 'single', { x: 120, y: 620, width: 340, height: 20 })] },
      { fieldDefId: 'currency', extractedValue: 'USD', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-13', 'Currency', 'Section 2.01(a), page 28', 28, 'Dollars')] },
      { fieldDefId: 'maturity_date', extractedValue: 'March 15, 2029', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-14', 'Maturity', 'Section 2.01(a), page 28', 28, 'the fifth anniversary of the Closing Date')] },
    ],
    subsections: [
      {
        sectionDefId: 'pricing-terms',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'base_rate_index', extractedValue: 'Term SOFR', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-15', 'Rate definition', 'Section 1.01, page 15', 15, '"Term SOFR Rate" means, with respect to any Term SOFR Borrowing and for any Interest Period, the Term SOFR Reference Rate...', 'single', { x: 100, y: 545, width: 380, height: 20 })] },
          {
            fieldDefId: 'applicable_margin', extractedValue: '2.25%', confidence: 'high', confidenceScore: 0.96, status: 'confirmed',
            citations: [
              cit('cit-16a', 'Rate definition', 'Section 1.01, page 8', 8, '"Applicable Rate" means, for any day, with respect to any Term SOFR Loan, the applicable rate per annum set forth below...', 'cross_reference', { x: 100, y: 400, width: 380, height: 20 }),
              cit('cit-16b', 'Pricing Grid', 'Schedule 1.1, page 178', 178, 'Pricing Level III (Total Leverage ≥ 3.50x and < 4.50x): Term SOFR Spread = 2.25%', 'cross_reference', { x: 100, y: 460, width: 350, height: 20 }),
              cit('cit-16c', 'Tier determination', 'Schedule 1.1, page 179', 179, 'Based on the Borrower\'s Total Leverage Ratio of 3.82x as of the most recent compliance certificate, Level III pricing applies.', 'cross_reference'),
            ],
          },
          { fieldDefId: 'rate_floor', extractedValue: '0.50%', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-17', 'Floor', 'Section 2.05(a), page 35', 35, 'provided that the Term SOFR Rate shall not be less than 0.50% per annum (the "Floor")', 'single', { x: 100, y: 720, width: 360, height: 20 })] },
          { fieldDefId: 'all_in_rate', extractedValue: '7.60%', confidence: 'medium', confidenceScore: 0.88, status: 'confirmed', citations: [cit('cit-18', 'Computed rate', 'Inferred', 0, 'Term SOFR (4.85%) + Applicable Margin (2.25%) + Floor adjustment (0.50%)', 'inferred')], formulaDisplay: 'Term SOFR (4.85%) + Margin (2.25%) + Floor adj (0.50%)' },
          { fieldDefId: 'day_count_convention', extractedValue: 'ACT/360', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-19', 'Day Count', 'Section 2.05(e), page 37', 37, 'computed on the basis of a year of 360 days')] },
          { fieldDefId: 'business_day_convention', extractedValue: 'Modified Following', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-20', 'Business Day', 'Section 1.01, page 5', 5, '"Business Day" ... the Modified Following Business Day Convention shall apply')] },
        ],
      },
      {
        sectionDefId: 'fee-schedule',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'commitment_fee', extractedValue: '0.30%', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-21', 'Commitment Fee', 'Section 2.05(b), page 36', 36, 'a commitment fee at a rate equal to 0.30% per annum on the average daily unused amount', 'single', { x: 100, y: 750, width: 360, height: 20 })] },
          { fieldDefId: 'lc_participation_fee', extractedValue: '2.25%', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-22', 'LC Fee', 'Section 2.05(d), page 37', 37, 'LC participation fee equal to the Applicable Rate for Term SOFR Loans')] },
          { fieldDefId: 'fronting_fee', extractedValue: '0.125%', confidence: 'medium', confidenceScore: 0.89, status: 'confirmed', citations: [cit('cit-23', 'Fronting Fee', 'Section 2.05(d), page 37', 37, 'a fronting fee equal to 0.125% per annum')] },
          { fieldDefId: 'admin_fee', extractedValue: '$75,000', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-24', 'Admin Fee', 'Fee Letter, page 1', 1, 'annual administration fee of $75,000')] },
        ],
      },
      {
        sectionDefId: 'sublimits-features',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'lc_sublimit', extractedValue: '$100,000,000', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-25', 'LC Sublimit', 'Section 2.01(c), page 30', 30, 'the aggregate LC Exposure shall not at any time exceed $100,000,000')] },
          { fieldDefId: 'swingline_sublimit', extractedValue: '$50,000,000', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-26', 'Swingline', 'Section 2.01(b), page 29', 29, 'Swingline Loans in an aggregate principal amount not to exceed $50,000,000')] },
          { fieldDefId: 'increase_option', extractedValue: '$200,000,000', confidence: 'medium', confidenceScore: 0.87, status: 'confirmed', citations: [cit('cit-27', 'Accordion', 'Section 2.15, page 45', 45, 'request an increase in the Revolving Credit Commitments in an aggregate amount not to exceed $200,000,000')] },
          { fieldDefId: 'accordion_feature', extractedValue: true, confidence: 'medium', confidenceScore: 0.85, status: 'confirmed', citations: [cit('cit-28', 'Accordion', 'Section 2.15, page 45', 45, 'Incremental Facility')] },
          { fieldDefId: 'multi_currency', extractedValue: false, confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'amortization',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'amortization_rate', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'frequency', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'amortization_schedule', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [], tableData: [] },
        ],
      },
    ],
  },

  // Facility B: $250M Term Loan A
  {
    sectionDefId: 'facility-terms',
    instanceLabel: 'Facility B: $250M Term Loan A',
    instanceIndex: 1,
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T13:30:00Z',
    fields: [
      { fieldDefId: 'facility_name', extractedValue: 'Term Loan A', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-30', 'Facility', 'Section 2.01(d), page 31', 31, '"Term Loan A Facility"')] },
      { fieldDefId: 'facility_type', extractedValue: 'Term Loan A', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-31', 'Type', 'Section 2.01(d), page 31', 31, 'term loan facility')] },
      { fieldDefId: 'commitment_amount', extractedValue: '$250,000,000', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-32', 'Commitment', 'Section 2.01(d), page 31', 31, 'Term Loan A Commitment in the aggregate principal amount of $250,000,000')] },
      { fieldDefId: 'currency', extractedValue: 'USD', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
      { fieldDefId: 'maturity_date', extractedValue: 'March 15, 2029', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-33', 'Maturity', 'Section 2.01(d), page 31', 31, 'Term Loan A Maturity Date')] },
    ],
    subsections: [
      {
        sectionDefId: 'pricing-terms',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'base_rate_index', extractedValue: 'Term SOFR', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-34', 'Rate', 'Section 1.01, page 15', 15, 'Term SOFR Rate')] },
          { fieldDefId: 'applicable_margin', extractedValue: '2.00%', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-35', 'Margin', 'Schedule 1.1, page 178', 178, 'Term Loan A: Level III Term SOFR Spread = 2.00%', 'cross_reference')] },
          { fieldDefId: 'rate_floor', extractedValue: '0.50%', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-36', 'Floor', 'Section 2.05(a), page 35', 35, 'Floor of 0.50%')] },
          { fieldDefId: 'all_in_rate', extractedValue: '7.35%', confidence: 'medium', confidenceScore: 0.87, status: 'confirmed', citations: [cit('cit-37', 'Computed', 'Inferred', 0, 'Term SOFR (4.85%) + Margin (2.00%) + Floor adj (0.50%)', 'inferred')], formulaDisplay: 'Term SOFR (4.85%) + Margin (2.00%) + Floor adj (0.50%)' },
          { fieldDefId: 'day_count_convention', extractedValue: 'ACT/360', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [] },
          { fieldDefId: 'business_day_convention', extractedValue: 'Modified Following', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'fee-schedule',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'commitment_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'lc_participation_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'fronting_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'admin_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'sublimits-features',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'lc_sublimit', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'swingline_sublimit', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'increase_option', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'accordion_feature', extractedValue: false, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'multi_currency', extractedValue: false, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'amortization',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'amortization_rate', extractedValue: '1.00%', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-40', 'Amort Rate', 'Section 2.06(b), page 38', 38, 'quarterly installments equal to 0.25% of the original principal amount')] },
          { fieldDefId: 'frequency', extractedValue: 'Quarterly', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-41', 'Frequency', 'Section 2.06(b), page 38', 38, 'on the last Business Day of each March, June, September and December')] },
          {
            fieldDefId: 'amortization_schedule', extractedValue: 'See table', confidence: 'high', confidenceScore: 0.94, status: 'confirmed', citations: [cit('cit-42', 'Schedule', 'Schedule 2.06, page 190', 190, 'Amortization Schedule')],
            tableData: [
              { date: 'June 30, 2024', amount: '$625,000', cumulative_pct: '0.25%' },
              { date: 'September 30, 2024', amount: '$625,000', cumulative_pct: '0.50%' },
              { date: 'December 31, 2024', amount: '$625,000', cumulative_pct: '0.75%' },
              { date: 'March 31, 2025', amount: '$625,000', cumulative_pct: '1.00%' },
            ],
          },
        ],
      },
    ],
  },

  // Facility C: $50M Letter of Credit
  {
    sectionDefId: 'facility-terms',
    instanceLabel: 'Facility C: $50M Letter of Credit Facility',
    instanceIndex: 2,
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T14:00:00Z',
    fields: [
      { fieldDefId: 'facility_name', extractedValue: 'Letter of Credit Facility', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-50', 'LC Facility', 'Section 2.01(c), page 30', 30, '"Letter of Credit Facility"')] },
      { fieldDefId: 'facility_type', extractedValue: 'Letter of Credit', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [] },
      { fieldDefId: 'commitment_amount', extractedValue: '$50,000,000', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-51', 'Commitment', 'Section 2.01(c), page 30', 30, 'LC Commitment of $50,000,000')] },
      { fieldDefId: 'currency', extractedValue: 'USD', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
      { fieldDefId: 'maturity_date', extractedValue: 'March 15, 2029', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [] },
    ],
    subsections: [
      {
        sectionDefId: 'pricing-terms',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'base_rate_index', extractedValue: 'Term SOFR', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [] },
          { fieldDefId: 'applicable_margin', extractedValue: '2.25%', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [] },
          { fieldDefId: 'rate_floor', extractedValue: '0.00%', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [] },
          { fieldDefId: 'all_in_rate', extractedValue: '7.10%', confidence: 'medium', confidenceScore: 0.86, status: 'confirmed', citations: [], formulaDisplay: 'Term SOFR (4.85%) + Margin (2.25%)' },
          { fieldDefId: 'day_count_convention', extractedValue: 'ACT/360', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [] },
          { fieldDefId: 'business_day_convention', extractedValue: 'Modified Following', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'fee-schedule',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'commitment_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'lc_participation_fee', extractedValue: '2.25%', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-55', 'LC Fee', 'Section 2.05(d), page 37', 37, 'LC participation fee')] },
          { fieldDefId: 'fronting_fee', extractedValue: '0.125%', confidence: 'high', confidenceScore: 0.93, status: 'confirmed', citations: [] },
          { fieldDefId: 'admin_fee', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'sublimits-features',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'lc_sublimit', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'swingline_sublimit', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'increase_option', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'accordion_feature', extractedValue: false, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'multi_currency', extractedValue: false, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
        ],
      },
      {
        sectionDefId: 'amortization',
        approvalStatus: 'approved',
        fields: [
          { fieldDefId: 'amortization_rate', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'frequency', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
          { fieldDefId: 'amortization_schedule', extractedValue: null, confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [], tableData: [] },
        ],
      },
    ],
  },

  // Financial Covenants
  {
    sectionDefId: 'financial-covenants',
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T14:15:00Z',
    fields: [
      { fieldDefId: 'max_total_leverage_ratio', extractedValue: '4.50x', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-60', 'Leverage Covenant', 'Section 7.11(a), page 98', 98, 'The Borrower will not permit the Total Leverage Ratio as of the end of any fiscal quarter to exceed 4.50 to 1.00')] },
      { fieldDefId: 'min_interest_coverage_ratio', extractedValue: '2.00x', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-61', 'Coverage Covenant', 'Section 7.11(b), page 99', 99, 'The Borrower will not permit the Interest Coverage Ratio as of the end of any fiscal quarter to be less than 2.00 to 1.00')] },
      { fieldDefId: 'max_senior_secured_leverage', extractedValue: '3.50x', confidence: 'high', confidenceScore: 0.94, status: 'confirmed', citations: [cit('cit-62', 'Sr. Secured', 'Section 7.11(c), page 99', 99, 'Senior Secured Leverage Ratio...shall not exceed 3.50 to 1.00')] },
      { fieldDefId: 'min_fixed_charge_coverage', extractedValue: '1.25x', confidence: 'medium', confidenceScore: 0.88, status: 'confirmed', citations: [cit('cit-63', 'Fixed Charge', 'Section 7.11(d), page 100', 100, 'Fixed Charge Coverage Ratio...not less than 1.25 to 1.00')] },
      { fieldDefId: 'max_capital_expenditure', extractedValue: '$75,000,000', confidence: 'medium', confidenceScore: 0.85, status: 'confirmed', citations: [cit('cit-64', 'CapEx', 'Section 7.12, page 101', 101, 'aggregate Capital Expenditures shall not exceed $75,000,000 in any fiscal year')] },
      { fieldDefId: 'covenant_testing_frequency', extractedValue: 'Quarterly', confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-65', 'Testing', 'Section 7.11, page 98', 98, 'as of the end of any fiscal quarter')] },
      { fieldDefId: 'first_test_date', extractedValue: 'June 30, 2024', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-66', 'First Test', 'Section 7.11, page 98', 98, 'commencing with the fiscal quarter ending June 30, 2024')] },
    ],
    subsections: [
      {
        sectionDefId: 'leverage-step-downs',
        approvalStatus: 'approved',
        fields: [
          {
            fieldDefId: 'step_down_schedule', extractedValue: 'See table', confidence: 'high', confidenceScore: 0.93, status: 'confirmed',
            citations: [cit('cit-67', 'Step-Down', 'Section 7.11(a), page 98', 98, 'Total Leverage Ratio step-down schedule')],
            tableData: [
              { period: 'Closing - Dec 2025', max_leverage: '4.50x', trigger: 'N/A' },
              { period: 'Jan 2026 - Dec 2026', max_leverage: '4.25x', trigger: 'Time-based' },
              { period: 'Jan 2027 - Dec 2027', max_leverage: '4.00x', trigger: 'Time-based' },
              { period: 'Jan 2028 - Maturity', max_leverage: '3.75x', trigger: 'Time-based' },
            ],
          },
        ],
      },
    ],
  },

  // Reporting Requirements
  {
    sectionDefId: 'reporting-requirements',
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T14:20:00Z',
    fields: [
      { fieldDefId: 'quarterly_financials_deadline', extractedValue: '45 days after quarter end', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-70', 'Reporting', 'Section 6.01(a), page 78', 78, 'within 45 days after the end of each fiscal quarter')] },
      { fieldDefId: 'annual_audit_deadline', extractedValue: '90 days after fiscal year end', confidence: 'high', confidenceScore: 0.94, status: 'confirmed', citations: [cit('cit-71', 'Annual', 'Section 6.01(b), page 78', 78, 'within 90 days after the end of each fiscal year')] },
      { fieldDefId: 'compliance_certificate_deadline', extractedValue: '45 days after quarter end', confidence: 'high', confidenceScore: 0.93, status: 'confirmed', citations: [cit('cit-72', 'Certificate', 'Section 6.02(a), page 79', 79, 'a Compliance Certificate within 45 days')] },
      { fieldDefId: 'borrowing_base_report_deadline', extractedValue: 'Not applicable', confidence: 'medium', confidenceScore: 0.82, status: 'confirmed', citations: [] },
    ],
  },

  // Conditions Precedent
  {
    sectionDefId: 'conditions-precedent',
    approvalStatus: 'approved',
    approvedBy: 'Sarah Chen',
    approvedAt: '2024-03-16T14:25:00Z',
    fields: [
      { fieldDefId: 'legal_opinion_required', extractedValue: true, confidence: 'high', confidenceScore: 0.97, status: 'confirmed', citations: [cit('cit-75', 'Legal Opinion', 'Section 4.01(e), page 54', 54, 'favorable written opinion of Cravath, Swaine & Moore LLP')] },
      { fieldDefId: 'officer_certificate_required', extractedValue: true, confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [] },
      { fieldDefId: 'insurance_certificate_required', extractedValue: true, confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [] },
      { fieldDefId: 'lien_search_required', extractedValue: true, confidence: 'high', confidenceScore: 0.94, status: 'confirmed', citations: [] },
      { fieldDefId: 'additional_conditions', extractedValue: 'Solvency certificate, environmental report, and organizational documents of the Borrower and each Guarantor.', confidence: 'medium', confidenceScore: 0.85, status: 'confirmed', citations: [cit('cit-76', 'Additional CPs', 'Section 4.01, page 52-56', 52, 'Conditions Precedent to Closing Date')] },
    ],
  },
]

const meridianCAResult: ExtractionResult = {
  id: 'exr-1',
  documentId: 'doc-1',
  dealId: 'deal-1',
  schemaId: 'credit-agreement-v1',
  status: 'completed',
  overallConfidence: 0.94,
  overallApproval: 'approved',
  completedSections: 8,
  totalSections: 8,
  assignedTo: 'Sarah Chen',
  startedAt: '2024-03-16T09:00:00Z',
  completedAt: '2024-03-16T14:30:00Z',
  sections: meridianCASections,
}

// ── Result 2: Meridian Compliance Certificate Q4 2024 (doc-4) ── IN PROGRESS / PARTIAL

const meridianCompCertResult: ExtractionResult = {
  id: 'exr-2',
  documentId: 'doc-4',
  dealId: 'deal-1',
  schemaId: 'compliance-certificate-v1',
  status: 'in_progress',
  overallConfidence: 0.91,
  overallApproval: 'partial',
  completedSections: 2,
  totalSections: 4,
  assignedTo: 'Michael Torres',
  startedAt: '2025-01-31T10:00:00Z',
  sections: [
    // Certificate Details — approved
    {
      sectionDefId: 'certificate-details',
      approvalStatus: 'approved',
      approvedBy: 'Michael Torres',
      approvedAt: '2025-01-31T10:30:00Z',
      fields: [
        { fieldDefId: 'borrower_name', extractedValue: 'Meridian Holdings Corp', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [cit('cit-100', 'Borrower', 'Page 1', 1, 'Meridian Holdings Corp.')] },
        { fieldDefId: 'reporting_period', extractedValue: 'Q4 2024', confidence: 'high', confidenceScore: 0.98, status: 'confirmed', citations: [cit('cit-101', 'Period', 'Page 1', 1, 'For the fiscal quarter ending December 31, 2024')] },
        { fieldDefId: 'period_end_date', extractedValue: 'December 31, 2024', confidence: 'high', confidenceScore: 0.99, status: 'confirmed', citations: [] },
        { fieldDefId: 'certification_date', extractedValue: 'January 28, 2025', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-102', 'Date', 'Page 8', 8, 'Dated: January 28, 2025')] },
        { fieldDefId: 'certifying_officer', extractedValue: 'Jennifer M. Walsh', confidence: 'medium', confidenceScore: 0.87, status: 'confirmed', citations: [cit('cit-103', 'Officer', 'Page 8', 8, 'By: /s/ Jennifer M. Walsh')] },
        { fieldDefId: 'title', extractedValue: 'Chief Financial Officer', confidence: 'medium', confidenceScore: 0.85, status: 'confirmed', citations: [cit('cit-104', 'Title', 'Page 8', 8, 'Title: Chief Financial Officer')] },
      ],
    },
    // Financial Summary — partial (one field flagged)
    {
      sectionDefId: 'financial-summary',
      approvalStatus: 'partial',
      fields: [
        { fieldDefId: 'total_revenue', extractedValue: '$580,000,000', confidence: 'high', confidenceScore: 0.96, status: 'confirmed', citations: [cit('cit-110', 'Revenue', 'Schedule A, page 3', 3, 'Total Revenue: $580,000,000')] },
        { fieldDefId: 'ebitda', extractedValue: '$142,500,000', confidence: 'medium', confidenceScore: 0.91, status: 'confirmed', citations: [cit('cit-111', 'EBITDA', 'Schedule A, page 3', 3, 'Consolidated EBITDA: $142,500,000')] },
        { fieldDefId: 'total_debt', extractedValue: '$462,500,000', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-112', 'Debt', 'Schedule B, page 4', 4, 'Total Consolidated Indebtedness: $462,500,000')] },
        { fieldDefId: 'senior_secured_debt', extractedValue: '$425,000,000', confidence: 'high', confidenceScore: 0.94, status: 'confirmed', citations: [cit('cit-113', 'Secured Debt', 'Schedule B, page 4', 4, 'Senior Secured Indebtedness: $425,000,000')] },
        { fieldDefId: 'net_income', extractedValue: '$67,200,000', confidence: 'medium', confidenceScore: 0.88, status: 'confirmed', citations: [cit('cit-114', 'Net Income', 'Schedule A, page 3', 3, 'Net Income: $67,200,000')] },
        {
          fieldDefId: 'interest_expense', extractedValue: '$29,687,500', confidence: 'medium', confidenceScore: 0.82, status: 'flagged',
          citations: [
            cit('cit-115a', 'Interest (Schedule A)', 'Schedule A, page 3', 3, 'Interest Expense: $29,687,500', 'cross_reference', { x: 250, y: 280, width: 200, height: 18 }),
            cit('cit-115b', 'Interest (Footnote 4)', 'Schedule A, Footnote 4, page 5', 5, 'Note: Interest expense per the audited financials was $31,250,000, which includes $1,562,500 of non-cash amortization of deferred financing costs excluded from the Compliance Certificate calculation per Section 1.01.', 'cross_reference', { x: 100, y: 420, width: 380, height: 45 }),
          ],
        },
        { fieldDefId: 'capital_expenditures', extractedValue: '$52,300,000', confidence: 'medium', confidenceScore: 0.84, status: 'confirmed', citations: [cit('cit-116', 'CapEx', 'Schedule C, page 6', 6, 'Capital Expenditures: $52,300,000')] },
        { fieldDefId: 'cash_and_equivalents', extractedValue: '$98,400,000', confidence: 'high', confidenceScore: 0.95, status: 'confirmed', citations: [cit('cit-117', 'Cash', 'Schedule B, page 4', 4, 'Cash and Cash Equivalents: $98,400,000')] },
      ],
    },
    // Covenant Test Results — pending (in review)
    {
      sectionDefId: 'covenant-test-results',
      approvalStatus: 'pending',
      fields: [
        {
          fieldDefId: 'covenant_tests_table', extractedValue: 'See table', confidence: 'high', confidenceScore: 0.93, status: 'unreviewed',
          citations: [cit('cit-120', 'Covenant Tests', 'Schedule D, page 7', 7, 'Covenant Compliance Calculations')],
          tableData: [
            { covenant_name: 'Total Leverage Ratio', reported_value: '3.25x', required_threshold: '4.50x', cushion: '27.8%', compliance_status: 'Pass' },
            { covenant_name: 'Interest Coverage Ratio', reported_value: '4.80x', required_threshold: '2.00x', cushion: '140.0%', compliance_status: 'Pass' },
            { covenant_name: 'Fixed Charge Coverage', reported_value: '1.85x', required_threshold: '1.25x', cushion: '48.0%', compliance_status: 'Pass' },
            { covenant_name: 'Sr. Secured Leverage', reported_value: '2.98x', required_threshold: '3.50x', cushion: '14.9%', compliance_status: 'Pass' },
            { covenant_name: 'Max CapEx', reported_value: '$52.3M', required_threshold: '$75.0M', cushion: '30.3%', compliance_status: 'Pass' },
          ],
        },
        { fieldDefId: 'total_leverage_ratio', extractedValue: '3.25x', confidence: 'high', confidenceScore: 0.96, status: 'unreviewed', citations: [cit('cit-121', 'Leverage', 'Schedule D, page 7', 7, 'Total Leverage Ratio: 3.25 to 1.00')] },
        { fieldDefId: 'interest_coverage_ratio', extractedValue: '4.80x', confidence: 'high', confidenceScore: 0.94, status: 'unreviewed', citations: [cit('cit-122', 'Coverage', 'Schedule D, page 7', 7, 'Interest Coverage Ratio: 4.80 to 1.00')] },
        {
          fieldDefId: 'fixed_charge_coverage_ratio', extractedValue: '1.85x', confidence: 'medium', confidenceScore: 0.82, status: 'unreviewed',
          citations: [
            cit('cit-123a', 'Fixed Charge (Schedule D)', 'Schedule D, page 7', 7, 'Fixed Charge Coverage Ratio: 1.85 to 1.00 (computed using Consolidated EBITDA less Maintenance CapEx)', 'cross_reference'),
            cit('cit-123b', 'Fixed Charge (Definition)', 'Credit Agreement Section 1.01', 0, 'Note: The Credit Agreement defines Fixed Charge Coverage as (EBITDA - Unfinanced CapEx) / Fixed Charges. The compliance certificate appears to use (EBITDA - Maintenance CapEx) which may produce a different result.', 'cross_reference'),
          ],
        },
        { fieldDefId: 'senior_secured_leverage', extractedValue: '2.98x', confidence: 'high', confidenceScore: 0.93, status: 'unreviewed', citations: [cit('cit-124', 'Sr. Secured', 'Schedule D, page 7', 7, 'Senior Secured Leverage Ratio: 2.98 to 1.00')] },
        { fieldDefId: 'overall_compliance', extractedValue: true, confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [cit('cit-125', 'Compliance', 'Page 2', 2, 'The undersigned hereby certifies that the Borrower is in compliance with all financial covenants.')] },
      ],
    },
    // Officer Certification — pending
    {
      sectionDefId: 'officer-certification',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'no_default_exists', extractedValue: true, confidence: 'high', confidenceScore: 0.97, status: 'unreviewed', citations: [cit('cit-130', 'No Default', 'Page 2', 2, 'no Default or Event of Default has occurred and is continuing')] },
        { fieldDefId: 'financial_statements_accurate', extractedValue: true, confidence: 'high', confidenceScore: 0.96, status: 'unreviewed', citations: [] },
        { fieldDefId: 'covenant_compliance_confirmed', extractedValue: true, confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [] },
        { fieldDefId: 'material_adverse_change', extractedValue: false, confidence: 'high', confidenceScore: 0.97, status: 'unreviewed', citations: [cit('cit-131', 'No MAC', 'Page 2', 2, 'no Material Adverse Change has occurred since December 31, 2023')] },
        { fieldDefId: 'additional_comments', extractedValue: 'None', confidence: 'medium', confidenceScore: 0.82, status: 'unreviewed', citations: [] },
      ],
    },
  ],
}

// ── Result 3: Meridian Funding Notice (doc-10) ── IN PROGRESS / PENDING

const meridianFundingResult: ExtractionResult = {
  id: 'exr-3',
  documentId: 'doc-10',
  dealId: 'deal-1',
  schemaId: 'borrowing-notice-v1',
  status: 'in_progress',
  overallConfidence: 0.90,
  overallApproval: 'pending',
  completedSections: 0,
  totalSections: 3,
  assignedTo: 'Sarah Chen',
  startedAt: '2025-02-05T14:00:00Z',
  sections: [
    {
      sectionDefId: 'notice-details',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'borrower_name', extractedValue: 'Meridian Holdings Corp', confidence: 'high', confidenceScore: 0.99, status: 'unreviewed', citations: [cit('cit-200', 'Borrower', 'Page 1', 1, 'Meridian Holdings Corp.')] },
        { fieldDefId: 'notice_date', extractedValue: 'February 5, 2025', confidence: 'high', confidenceScore: 0.97, status: 'unreviewed', citations: [cit('cit-201', 'Date', 'Page 1', 1, 'Date: February 5, 2025')] },
        { fieldDefId: 'effective_date', extractedValue: 'February 10, 2025', confidence: 'high', confidenceScore: 0.96, status: 'unreviewed', citations: [cit('cit-202', 'Effective', 'Page 1', 1, 'Requested Borrowing Date: February 10, 2025')] },
        { fieldDefId: 'facility_reference', extractedValue: 'Revolving Credit Facility under Credit Agreement dated March 15, 2024', confidence: 'medium', confidenceScore: 0.89, status: 'unreviewed', citations: [cit('cit-203', 'Facility Ref', 'Page 1', 1, 'pursuant to the Revolving Credit Facility under that certain Amended and Restated Credit Agreement dated as of March 15, 2024')] },
        { fieldDefId: 'credit_agreement_reference', extractedValue: 'Amended and Restated Credit Agreement dated as of March 15, 2024', confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [] },
      ],
    },
    {
      sectionDefId: 'borrowing-request',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'borrowing_amount', extractedValue: '$50,000,000', confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [cit('cit-210', 'Amount', 'Page 1', 1, 'Borrowing Amount: $50,000,000.00')] },
        { fieldDefId: 'currency', extractedValue: 'USD', confidence: 'high', confidenceScore: 0.99, status: 'unreviewed', citations: [] },
        { fieldDefId: 'borrowing_type', extractedValue: 'Initial Borrowing', confidence: 'medium', confidenceScore: 0.85, status: 'unreviewed', citations: [cit('cit-211', 'Type', 'Page 1', 1, 'Type of Borrowing: Initial Borrowing')] },
        { fieldDefId: 'rate_type', extractedValue: 'Term SOFR', confidence: 'high', confidenceScore: 0.96, status: 'unreviewed', citations: [cit('cit-212', 'Rate', 'Page 1', 1, 'Interest Rate Election: Term SOFR')] },
        { fieldDefId: 'interest_period', extractedValue: '1 Month', confidence: 'medium', confidenceScore: 0.88, status: 'unreviewed', citations: [cit('cit-213', 'Period', 'Page 1', 1, 'Interest Period: One (1) Month')] },
        { fieldDefId: 'requested_funding_date', extractedValue: 'February 10, 2025', confidence: 'high', confidenceScore: 0.93, status: 'unreviewed', citations: [] },
        { fieldDefId: 'maturity_date', extractedValue: 'March 10, 2025', confidence: 'medium', confidenceScore: 0.82, status: 'unreviewed', citations: [cit('cit-214', 'Maturity', 'Page 1', 1, 'Interest Period End Date: March 10, 2025')] },
        { fieldDefId: 'purpose', extractedValue: 'Working capital and general corporate purposes', confidence: 'medium', confidenceScore: 0.80, status: 'unreviewed', citations: [cit('cit-215', 'Purpose', 'Page 2', 2, 'Purpose: Working capital and general corporate purposes')] },
      ],
    },
    {
      sectionDefId: 'wire-instructions',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'bank_name', extractedValue: 'JPMorgan Chase Bank, N.A.', confidence: 'high', confidenceScore: 0.97, status: 'unreviewed', citations: [cit('cit-220', 'Bank', 'Page 2', 2, 'Bank: JPMorgan Chase Bank, N.A.')] },
        { fieldDefId: 'aba_routing_number', extractedValue: '021000021', confidence: 'medium', confidenceScore: 0.88, status: 'unreviewed', citations: [cit('cit-221', 'ABA', 'Page 2', 2, 'ABA: 021000021')] },
        { fieldDefId: 'account_number', extractedValue: '****4589', confidence: 'medium', confidenceScore: 0.82, status: 'unreviewed', citations: [cit('cit-222', 'Account', 'Page 2', 2, 'Account No: [partially redacted]')] },
        { fieldDefId: 'account_name', extractedValue: 'Meridian Holdings Corp Operating Account', confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [] },
        { fieldDefId: 'reference', extractedValue: 'Revolver Draw - Feb 2025', confidence: 'medium', confidenceScore: 0.80, status: 'unreviewed', citations: [cit('cit-223', 'Reference', 'Page 2', 2, 'Reference: Revolver Draw - Feb 2025')] },
      ],
    },
  ],
}

// ── Result 4: Vanguard Energy Draw Request (doc-14) ── IN PROGRESS / PENDING

const vanguardDrawResult: ExtractionResult = {
  id: 'exr-4',
  documentId: 'doc-14',
  dealId: 'deal-4',
  schemaId: 'borrowing-notice-v1',
  status: 'in_progress',
  overallConfidence: 0.85,
  overallApproval: 'pending',
  completedSections: 0,
  totalSections: 3,
  assignedTo: 'Michael Torres',
  startedAt: '2025-02-09T16:00:00Z',
  sections: [
    {
      sectionDefId: 'notice-details',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'borrower_name', extractedValue: 'Vanguard Energy Partners LLC', confidence: 'high', confidenceScore: 0.97, status: 'unreviewed', citations: [cit('cit-300', 'Borrower', 'Page 1', 1, 'Vanguard Energy Partners LLC')] },
        { fieldDefId: 'notice_date', extractedValue: 'February 9, 2025', confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [] },
        { fieldDefId: 'effective_date', extractedValue: 'February 20, 2025', confidence: 'medium', confidenceScore: 0.88, status: 'unreviewed', citations: [cit('cit-301', 'Effective', 'Page 1', 1, 'Requested Draw Date: 02/20/2025')] },
        { fieldDefId: 'facility_reference', extractedValue: 'Delayed Draw Term Loan under Credit Agreement dated September 10, 2024', confidence: 'medium', confidenceScore: 0.84, status: 'unreviewed', citations: [cit('cit-302', 'Facility', 'Page 1', 1, 'Delayed Draw Term Loan Facility under the Credit Agreement dated as of September 10, 2024')] },
        { fieldDefId: 'credit_agreement_reference', extractedValue: 'Credit Agreement dated as of September 10, 2024', confidence: 'high', confidenceScore: 0.93, status: 'unreviewed', citations: [] },
      ],
    },
    {
      sectionDefId: 'borrowing-request',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'borrowing_amount', extractedValue: '$75,000,000', confidence: 'medium', confidenceScore: 0.85, status: 'unreviewed', citations: [cit('cit-310', 'Amount', 'Page 1', 1, 'Draw Amount: $75,000,000')] },
        { fieldDefId: 'currency', extractedValue: 'USD', confidence: 'high', confidenceScore: 0.99, status: 'unreviewed', citations: [] },
        { fieldDefId: 'borrowing_type', extractedValue: 'Initial Borrowing', confidence: 'medium', confidenceScore: 0.82, status: 'unreviewed', citations: [] },
        { fieldDefId: 'rate_type', extractedValue: 'Term SOFR', confidence: 'high', confidenceScore: 0.95, status: 'unreviewed', citations: [cit('cit-311', 'Rate', 'Page 1', 1, 'Rate Election: Term SOFR')] },
        { fieldDefId: 'interest_period', extractedValue: '3 Months', confidence: 'medium', confidenceScore: 0.80, status: 'unreviewed', citations: [cit('cit-312', 'Period', 'Page 2', 2, 'Interest Period: 3 months')] },
        { fieldDefId: 'requested_funding_date', extractedValue: 'February 20, 2025', confidence: 'medium', confidenceScore: 0.85, status: 'unreviewed', citations: [] },
        { fieldDefId: 'maturity_date', extractedValue: 'May 20, 2025', confidence: 'low', confidenceScore: 0.72, status: 'unreviewed', citations: [cit('cit-313', 'Maturity', 'Page 2', 2, 'End Date: [handwritten] 5/20/25', 'single', { x: 280, y: 350, width: 120, height: 22 })] },
        { fieldDefId: 'purpose', extractedValue: 'Phase 3 Expansion - Pipeline Construction', confidence: 'low', confidenceScore: 0.72, status: 'unreviewed', citations: [cit('cit-314', 'Purpose', 'Page 2', 2, 'Purpose: Phase 3 Expansion — Pipeline Construction (see attached project summary)')] },
      ],
    },
    {
      sectionDefId: 'wire-instructions',
      approvalStatus: 'pending',
      fields: [
        { fieldDefId: 'bank_name', extractedValue: 'Wells Fargo Bank, N.A.', confidence: 'high', confidenceScore: 0.96, status: 'unreviewed', citations: [cit('cit-320', 'Bank', 'Page 3', 3, 'Bank: Wells Fargo Bank, N.A.')] },
        { fieldDefId: 'aba_routing_number', extractedValue: '121000248', confidence: 'medium', confidenceScore: 0.85, status: 'unreviewed', citations: [cit('cit-321', 'ABA', 'Page 3', 3, 'ABA/Routing: 121000248')] },
        { fieldDefId: 'account_number', extractedValue: '****7823', confidence: 'medium', confidenceScore: 0.80, status: 'unreviewed', citations: [] },
        { fieldDefId: 'account_name', extractedValue: 'Vanguard Energy Partners LLC', confidence: 'high', confidenceScore: 0.94, status: 'unreviewed', citations: [] },
        { fieldDefId: 'reference', extractedValue: 'DDTL Draw #3 - Pipeline Phase 3', confidence: 'medium', confidenceScore: 0.78, status: 'unreviewed', citations: [cit('cit-322', 'Reference', 'Page 3', 3, 'Ref: DDTL Draw #3 - Pipeline Phase 3')] },
      ],
    },
  ],
}

// ── Export ──

export const extractionResults: ExtractionResult[] = [
  meridianCAResult,
  meridianCompCertResult,
  meridianFundingResult,
  vanguardDrawResult,
]

export function getExtractionResultByDocumentId(documentId: string): ExtractionResult | undefined {
  return extractionResults.find(r => r.documentId === documentId)
}
