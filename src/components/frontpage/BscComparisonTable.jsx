import React from 'react';

/**
 * Komponen BscComparisonTable
 * Menampilkan tabel komparasi nilai 'Book direct, know exactly who you are dealing with'
 * yang membandingkan Bali Stay Collection dengan platform pemesanan umum lainnya.
 * 
 * @returns {React.JSX.Element} Elemen JSX tabel perbandingan
 */
export default function BscComparisonTable() {
  const rows = [
    {
      feature: 'Who answers your questions',
      bsc: 'The local team that manages the villa',
      others: 'Often a chat bot or a remote agent'
    },
    {
      feature: 'Price',
      bsc: 'Total shown upfront',
      others: 'Fees may appear at checkout'
    },
    {
      feature: 'Changes to your plans',
      bsc: 'Free reschedule on selected villas',
      others: 'Depends on each host'
    },
    {
      feature: 'Help during your stay',
      bsc: 'On-call local team',
      others: 'Platform support, often remote'
    }
  ];

  return (
    <section className="sec sec-compare" id="compare">
      <div className="wrap">
        <div className="sec-head">
          <div className="eyebrow">Why book direct</div>
          <h2>Book direct, know exactly who you are dealing with</h2>
        </div>

        <div className="cmp-table-wrap">
          <table className="cmp">
            <thead>
              <tr>
                <th />
                <th>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/logo.svg" alt="BSC" style={{ height: '20px', width: 'auto', display: 'inline-block' }} />
                    <span>Bali Stay Collection</span>
                  </span>
                </th>
                <th>Typical booking platforms</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feature}</td>
                  <td>{row.bsc}</td>
                  <td>{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
