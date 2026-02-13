import type { ExtractionSchema } from '@/types'

// ── Schema 1: Credit Agreement ──

export const creditAgreementSchema: ExtractionSchema = {
  id: 'credit-agreement-v1',
  name: 'Credit Agreement',
  documentCategory: 'credit_agreement',
  version: '1.0',
  description: 'Comprehensive schema for syndicated credit agreement extraction with facility-level detail, covenants, and conditions precedent.',
  sections: [
    {
      id: 'agreement-overview',
      label: 'Agreement Overview',
      level: 'agreement',
      approvalScope: 'field',
      fields: [
        { id: 'borrower_name', label: 'Borrower Name', type: 'text', required: true, width: 'half' },
        { id: 'agent_bank', label: 'Agent Bank', type: 'text', required: true, width: 'half' },
        { id: 'governing_law', label: 'Governing Law', type: 'text', width: 'half' },
        { id: 'closing_date', label: 'Closing Date', type: 'date', required: true, width: 'half' },
        { id: 'effective_date', label: 'Effective Date', type: 'date', width: 'half' },
        {
          id: 'agreement_type',
          label: 'Agreement Type',
          type: 'select',
          options: ['Amended & Restated', 'Original', 'Amendment'],
          required: true,
          width: 'half',
        },
        { id: 'total_facility_amount', label: 'Total Facility Amount', type: 'currency', required: true, width: 'full' },
        { id: 'number_of_facilities', label: 'Number of Facilities', type: 'number', width: 'half' },
      ],
    },
    {
      id: 'facility-terms',
      label: 'Facility Terms',
      level: 'facility',
      approvalScope: 'field',
      repeatable: true,
      repeatLabel: 'Facility',
      collapsible: true,
      fields: [
        { id: 'facility_name', label: 'Facility Name', type: 'text', required: true, width: 'half' },
        {
          id: 'facility_type',
          label: 'Facility Type',
          type: 'select',
          options: ['Revolving Credit', 'Term Loan A', 'Term Loan B', 'Delayed Draw', 'Letter of Credit', 'Swingline'],
          required: true,
          width: 'half',
        },
        { id: 'commitment_amount', label: 'Commitment Amount', type: 'currency', required: true, width: 'half' },
        {
          id: 'currency',
          label: 'Currency',
          type: 'select',
          options: ['USD', 'EUR', 'GBP', 'JPY', 'CHF'],
          required: true,
          width: 'half',
        },
        { id: 'maturity_date', label: 'Maturity Date', type: 'date', required: true, width: 'half' },
      ],
      subsections: [
        {
          id: 'pricing-terms',
          label: 'Pricing Terms',
          level: 'general',
          approvalScope: 'field',
          fields: [
            {
              id: 'base_rate_index',
              label: 'Base Rate Index',
              type: 'select',
              options: ['Term SOFR', 'Daily SOFR', 'EURIBOR', 'SONIA', 'Prime'],
              required: true,
              width: 'half',
            },
            { id: 'applicable_margin', label: 'Applicable Margin', type: 'rate', required: true, width: 'half' },
            { id: 'rate_floor', label: 'Rate Floor', type: 'rate', width: 'half' },
            { id: 'all_in_rate', label: 'All-in Rate', type: 'rate', width: 'half', description: 'formula display' },
            {
              id: 'day_count_convention',
              label: 'Day Count Convention',
              type: 'select',
              options: ['ACT/360', 'ACT/365', '30/360'],
              width: 'half',
            },
            {
              id: 'business_day_convention',
              label: 'Business Day Convention',
              type: 'select',
              options: ['Modified Following', 'Following', 'Preceding'],
              width: 'half',
            },
          ],
        },
        {
          id: 'fee-schedule',
          label: 'Fee Schedule',
          level: 'general',
          approvalScope: 'field',
          fields: [
            { id: 'commitment_fee', label: 'Commitment Fee', type: 'rate', width: 'half' },
            { id: 'lc_participation_fee', label: 'LC Participation Fee', type: 'rate', width: 'half' },
            { id: 'fronting_fee', label: 'Fronting Fee', type: 'rate', width: 'half' },
            { id: 'admin_fee', label: 'Admin Fee', type: 'currency', width: 'half' },
          ],
        },
        {
          id: 'sublimits-features',
          label: 'Sublimits & Features',
          level: 'general',
          approvalScope: 'section',
          fields: [
            { id: 'lc_sublimit', label: 'LC Sublimit', type: 'currency', width: 'half' },
            { id: 'swingline_sublimit', label: 'Swingline Sublimit', type: 'currency', width: 'half' },
            { id: 'increase_option', label: 'Increase Option', type: 'currency', width: 'half' },
            { id: 'accordion_feature', label: 'Accordion Feature', type: 'boolean', width: 'half' },
            { id: 'multi_currency', label: 'Multi-Currency', type: 'boolean', width: 'half' },
          ],
        },
        {
          id: 'amortization',
          label: 'Amortization',
          level: 'general',
          approvalScope: 'section',
          fields: [
            { id: 'amortization_rate', label: 'Amortization Rate', type: 'percentage', width: 'half' },
            {
              id: 'frequency',
              label: 'Frequency',
              type: 'select',
              options: ['Quarterly', 'Semi-Annual', 'Annual'],
              width: 'half',
            },
            {
              id: 'amortization_schedule',
              label: 'Amortization Schedule',
              type: 'table',
              width: 'full',
              columns: [
                { key: 'date', label: 'Date', type: 'date' },
                { key: 'amount', label: 'Currency', type: 'currency' },
                { key: 'cumulative_pct', label: 'Percentage', type: 'percentage' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'financial-covenants',
      label: 'Financial Covenants',
      level: 'covenant',
      approvalScope: 'field',
      collapsible: true,
      fields: [
        { id: 'max_total_leverage_ratio', label: 'Max Total Leverage Ratio', type: 'ratio', required: true, width: 'half' },
        { id: 'min_interest_coverage_ratio', label: 'Min Interest Coverage Ratio', type: 'ratio', required: true, width: 'half' },
        { id: 'max_senior_secured_leverage', label: 'Max Senior Secured Leverage', type: 'ratio', width: 'half' },
        { id: 'min_fixed_charge_coverage', label: 'Min Fixed Charge Coverage', type: 'ratio', width: 'half' },
        { id: 'max_capital_expenditure', label: 'Max Capital Expenditure', type: 'currency', width: 'half' },
        {
          id: 'covenant_testing_frequency',
          label: 'Covenant Testing Frequency',
          type: 'select',
          options: ['Quarterly', 'Semi-Annual', 'Annual'],
          width: 'half',
        },
        { id: 'first_test_date', label: 'First Test Date', type: 'date', width: 'half' },
      ],
      subsections: [
        {
          id: 'leverage-step-downs',
          label: 'Leverage Step-Downs',
          level: 'general',
          approvalScope: 'section',
          fields: [
            {
              id: 'step_down_schedule',
              label: 'Step-Down Schedule',
              type: 'table',
              width: 'full',
              columns: [
                { key: 'period', label: 'Period', type: 'text' },
                { key: 'max_leverage', label: 'Max Leverage', type: 'ratio' },
                { key: 'trigger', label: 'Trigger', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'reporting-requirements',
      label: 'Reporting Requirements',
      level: 'reporting',
      approvalScope: 'section',
      collapsible: true,
      fields: [
        { id: 'quarterly_financials_deadline', label: 'Quarterly Financials Deadline', type: 'text', width: 'half', description: 'e.g. "45 days after quarter end"' },
        { id: 'annual_audit_deadline', label: 'Annual Audit Deadline', type: 'text', width: 'half' },
        { id: 'compliance_certificate_deadline', label: 'Compliance Certificate Deadline', type: 'text', width: 'half' },
        { id: 'borrowing_base_report_deadline', label: 'Borrowing Base Report Deadline', type: 'text', width: 'half' },
      ],
    },
    {
      id: 'conditions-precedent',
      label: 'Conditions Precedent',
      level: 'conditions',
      approvalScope: 'section',
      collapsible: true,
      fields: [
        { id: 'legal_opinion_required', label: 'Legal Opinion Required', type: 'boolean', width: 'half' },
        { id: 'officer_certificate_required', label: 'Officer Certificate Required', type: 'boolean', width: 'half' },
        { id: 'insurance_certificate_required', label: 'Insurance Certificate Required', type: 'boolean', width: 'half' },
        { id: 'lien_search_required', label: 'Lien Search Required', type: 'boolean', width: 'half' },
        { id: 'additional_conditions', label: 'Additional Conditions', type: 'text', width: 'full' },
      ],
    },
  ],
}

// ── Schema 2: Compliance Certificate ──

export const complianceCertificateSchema: ExtractionSchema = {
  id: 'compliance-certificate-v1',
  name: 'Compliance Certificate',
  documentCategory: 'compliance_certificate',
  version: '1.0',
  description: 'Schema for extracting covenant compliance test results and officer certifications from periodic compliance certificates.',
  sections: [
    {
      id: 'certificate-details',
      label: 'Certificate Details',
      level: 'agreement',
      approvalScope: 'field',
      fields: [
        { id: 'borrower_name', label: 'Borrower Name', type: 'text', required: true, width: 'half' },
        { id: 'reporting_period', label: 'Reporting Period', type: 'text', required: true, width: 'half' },
        { id: 'period_end_date', label: 'Period End Date', type: 'date', required: true, width: 'half' },
        { id: 'certification_date', label: 'Certification Date', type: 'date', required: true, width: 'half' },
        { id: 'certifying_officer', label: 'Certifying Officer', type: 'text', required: true, width: 'half' },
        { id: 'title', label: 'Title', type: 'text', width: 'half' },
      ],
    },
    {
      id: 'financial-summary',
      label: 'Financial Summary',
      level: 'general',
      approvalScope: 'field',
      fields: [
        { id: 'total_revenue', label: 'Total Revenue', type: 'currency', width: 'half' },
        { id: 'ebitda', label: 'EBITDA', type: 'currency', width: 'half' },
        { id: 'total_debt', label: 'Total Debt', type: 'currency', width: 'half' },
        { id: 'senior_secured_debt', label: 'Senior Secured Debt', type: 'currency', width: 'half' },
        { id: 'net_income', label: 'Net Income', type: 'currency', width: 'half' },
        { id: 'interest_expense', label: 'Interest Expense', type: 'currency', width: 'half' },
        { id: 'capital_expenditures', label: 'Capital Expenditures', type: 'currency', width: 'half' },
        { id: 'cash_and_equivalents', label: 'Cash & Equivalents', type: 'currency', width: 'half' },
      ],
    },
    {
      id: 'covenant-test-results',
      label: 'Covenant Test Results',
      level: 'covenant',
      approvalScope: 'field',
      fields: [
        {
          id: 'covenant_tests_table',
          label: 'Covenant Tests',
          type: 'table',
          width: 'full',
          columns: [
            { key: 'covenant_name', label: 'Covenant Name', type: 'text' },
            { key: 'reported_value', label: 'Reported Value', type: 'ratio' },
            { key: 'required_threshold', label: 'Required Threshold', type: 'ratio' },
            { key: 'cushion', label: 'Cushion', type: 'percentage' },
            { key: 'compliance_status', label: 'Compliance Status', type: 'text' },
          ],
        },
        { id: 'total_leverage_ratio', label: 'Total Leverage Ratio', type: 'ratio', width: 'half' },
        { id: 'interest_coverage_ratio', label: 'Interest Coverage Ratio', type: 'ratio', width: 'half' },
        { id: 'fixed_charge_coverage_ratio', label: 'Fixed Charge Coverage Ratio', type: 'ratio', width: 'half' },
        { id: 'senior_secured_leverage', label: 'Senior Secured Leverage', type: 'ratio', width: 'half' },
        { id: 'overall_compliance', label: 'Overall Compliance', type: 'boolean', width: 'half' },
      ],
    },
    {
      id: 'officer-certification',
      label: 'Officer Certification',
      level: 'general',
      approvalScope: 'section',
      fields: [
        { id: 'no_default_exists', label: 'No Default Exists', type: 'boolean', width: 'half' },
        { id: 'financial_statements_accurate', label: 'Financial Statements Accurate', type: 'boolean', width: 'half' },
        { id: 'covenant_compliance_confirmed', label: 'Covenant Compliance Confirmed', type: 'boolean', width: 'half' },
        { id: 'material_adverse_change', label: 'Material Adverse Change', type: 'boolean', width: 'half' },
        { id: 'additional_comments', label: 'Additional Comments', type: 'text', width: 'full' },
      ],
    },
  ],
}

// ── Schema 3: Borrowing Notice ──

export const borrowingNoticeSchema: ExtractionSchema = {
  id: 'borrowing-notice-v1',
  name: 'Borrowing Notice',
  documentCategory: 'borrowing_notice',
  version: '1.0',
  description: 'Schema for extracting borrowing request details, rate selections, and wire instructions from borrowing notices.',
  sections: [
    {
      id: 'notice-details',
      label: 'Notice Details',
      level: 'agreement',
      approvalScope: 'field',
      fields: [
        { id: 'borrower_name', label: 'Borrower Name', type: 'text', required: true, width: 'half' },
        { id: 'notice_date', label: 'Notice Date', type: 'date', required: true, width: 'half' },
        { id: 'effective_date', label: 'Effective Date', type: 'date', required: true, width: 'half' },
        { id: 'facility_reference', label: 'Facility Reference', type: 'text', required: true, width: 'half' },
        { id: 'credit_agreement_reference', label: 'Credit Agreement Reference', type: 'text', width: 'half' },
      ],
    },
    {
      id: 'borrowing-request',
      label: 'Borrowing Request',
      level: 'general',
      approvalScope: 'field',
      fields: [
        { id: 'borrowing_amount', label: 'Borrowing Amount', type: 'currency', required: true, width: 'half' },
        {
          id: 'currency',
          label: 'Currency',
          type: 'select',
          options: ['USD', 'EUR', 'GBP'],
          required: true,
          width: 'half',
        },
        {
          id: 'borrowing_type',
          label: 'Borrowing Type',
          type: 'select',
          options: ['Initial Borrowing', 'Rollover', 'Conversion'],
          required: true,
          width: 'half',
        },
        {
          id: 'rate_type',
          label: 'Rate Type',
          type: 'select',
          options: ['Term SOFR', 'Base Rate', 'EURIBOR', 'SONIA'],
          required: true,
          width: 'half',
        },
        {
          id: 'interest_period',
          label: 'Interest Period',
          type: 'select',
          options: ['1 Month', '3 Months', '6 Months'],
          width: 'half',
        },
        { id: 'requested_funding_date', label: 'Requested Funding Date', type: 'date', required: true, width: 'half' },
        { id: 'maturity_date', label: 'Maturity Date', type: 'date', width: 'half' },
        { id: 'purpose', label: 'Purpose', type: 'text', width: 'full' },
      ],
    },
    {
      id: 'wire-instructions',
      label: 'Wire Instructions',
      level: 'general',
      approvalScope: 'section',
      fields: [
        { id: 'bank_name', label: 'Bank Name', type: 'text', width: 'half' },
        { id: 'aba_routing_number', label: 'ABA/Routing Number', type: 'text', width: 'half' },
        { id: 'account_number', label: 'Account Number', type: 'text', width: 'half' },
        { id: 'account_name', label: 'Account Name', type: 'text', width: 'half' },
        { id: 'reference', label: 'Reference', type: 'text', width: 'half' },
      ],
    },
  ],
}

// ── Aggregated Exports ──

export const extractionSchemas: ExtractionSchema[] = [
  creditAgreementSchema,
  complianceCertificateSchema,
  borrowingNoticeSchema,
]

export function getSchemaByCategory(category: string): ExtractionSchema | undefined {
  return extractionSchemas.find((schema) => schema.documentCategory === category)
}
