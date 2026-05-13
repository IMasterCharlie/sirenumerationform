import React, { forwardRef } from 'react';
import { FormData } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface FormPreviewProps {
  data: FormData;
}

export const FormPreview = forwardRef<HTMLDivElement, FormPreviewProps>(({ data }, ref) => {
  const renderDobGrid = (dob: string) => {
    if (!dob) return Array(8).fill('');
    const date = new Date(dob);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const chars = [...day, ...month, ...year].slice(0, 8);
    return Array.from({ length: 8 }, (_, i) => chars[i] || '');
  };

  const dobChars = renderDobGrid(data.dob);

  return (
    <div
      ref={ref}
      className="bg-white p-[45px] w-[210mm] min-h-[297mm] mx-auto text-[13px] font-sans leading-tight border border-[#e5e7eb] shadow-none print:shadow-none print:border-none uppercase text-black"
      id="form-to-print"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Top Header */}
      <div className="flex justify-end mb-1">
        <span className="font-bold underline text-[15px]">Annexure-III</span>
      </div>

      <div className="text-center mb-3">
        <h1 className="text-[20px] font-bold mb-1">SIR 2026 Enumeration Form</h1>
        <p className="text-[13px] font-bold">Name and contact No of BLO (pre-printed)</p>
      </div>

      {/* Header Table (5 Columns) */}
      <table className="w-full border-collapse border border-black mb-2 text-[13px]">
        <tbody>
          {/* --- FIRST ROW --- */}
          <tr>
            {/* Split Column - Top */}
            <td className="border border-black pb-5 pt-1 w-[25%] align-middle text-left leading-tight">
              <span className="font-semibold text-xs">Elector’s Name : </span>
            </td>

            {/* All these cells span 2 rows vertically */}
            <td rowSpan={2} className="border border-black px-2 py-4 w-[20%] align-middle text-left leading-tight">
              {/* Changed space-y-1 to space-y-4 */}
              <div className="space-y-4">
                <p>AC No. : </p>
                <p>Part No. : </p>
                <p>Sr No. : </p>
              </div>
            </td>

            <td rowSpan={2} className="border border-black p-2 w-[15%] text-center align-middle text-gray-400 text-xs">
              QR Code
            </td>

            <td rowSpan={2} className="border border-black p-2 w-[20%] text-center align-middle leading-tight text-xs">
              Old Photo
            </td>

            <td rowSpan={2} className="border border-black p-2 w-[20%] text-center align-middle leading-tight text-xs">
              Paste Current<br />Photo
            </td>
          </tr>

          {/* --- SECOND ROW --- */}
          <tr>
            {/* Split Column - Bottom */}
            <td className="border border-black pb-5 pt-1 w-[25%] align-middle text-left leading-tight">
              <span className="font-semibold text-xs">EPIC Number : </span>
            </td>
            {/* The rowSpan={2} cells from the first row automatically fill the rest of this row */}
          </tr>
        </tbody>
      </table>

      {/* Table A (Personal Details) */}
      <table className="w-full border-collapse border border-black mb-2 text-[12px]">
        <tbody>
          <tr className="h-8">
            <td className="border border-black px-3 w-[45%] align-middle text-left">Address</td>
            <td className="border border-black px-3 text-[13px] align-middle text-left">{data.address}</td>
          </tr>
          <tr>
            <td className="border border-black px-3 w-[45%] align-middle text-left">Date of Birth (DD/MM/YYYY)</td>
            <td className="border border-black p-0 h-[32px]">
              <div className="grid grid-cols-8 h-full divide-x divide-black">
                {dobChars.map((char, i) => (
                  <div key={i} className="flex flex-col items-center justify-center relative">
                    <span className="text-[15px]">{char}</span>
                  </div>
                ))}
              </div>
            </td>
          </tr>
          {[
            ['Aadhaar No. (Optional)', data.aadhaarNo],
            ['Mobile No.', data.mobileNo],
          ].map(([label, value], i) => (
            <tr key={i} className="h-8">
              <td className="border border-black px-3 align-middle text-left">{label}</td>
              <td className="border border-black px-3 text-[13px] align-middle text-left">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Family Details Table (Separate) */}
      <table className="w-full border-collapse border border-black mb-2 text-[12px]">
        <thead>
          <tr className="h-7 bg-[#f9fafb]">
            <th className="border border-black px-3 w-[30%] text-left align-middle font-semibold">Relation</th>
            <th className="border border-black px-3 w-[35%] text-left align-middle font-semibold">Name</th>
            <th className="border border-black px-3 w-[35%] text-left align-middle font-semibold">EPIC No.</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Father/Guardian', data.fatherName, data.fatherEpic],
            ['Mother', data.motherName, data.motherEpic],
            ['Spouse', data.spouseName, data.spouseEpic],
          ].map(([relation, name, epic], i) => (
            <tr key={i} className="h-7">
              <td className="border border-black px-3 align-middle text-left font-semibold text-[11px]">{relation}</td>
              <td className="border border-black px-3 align-middle text-left text-[13px]">{name}</td>
              <td className="border border-black px-3 align-middle text-left text-[13px]">{epic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='font-bold text-center text-xl'>Last SIR 2002 Details</div>
      {/* Bottom Table Headers (B & C) */}
      <table className="w-full border-collapse border border-black mb-0 text-[11.5px] font-bold">
        <thead>
          <tr className="h-10">
            <th className="border border-black px-3 w-1/2 text-left align-middle bg-[#f9fafb]">Details of the Elector in the Electoral Roll <br />of the last SIR</th>
            <th className="border border-black px-3 w-1/2 text-left align-middle bg-[#f9fafb]">Details of the Relative, whose name is given in <br />the previous column, in the last SIR</th>
          </tr>
        </thead>
      </table>

      {/* SIR Detail Rows */}
      <table className="w-full border-collapse border border-black mb-2 text-[11.5px]">
        <tbody>
          <tr className="h-7">
            <td className="border border-black px-3 w-1/2 align-middle text-left">Elector Name: <span className="text-[13px] ml-1">{data.bElectorName}</span></td>
            <td className="border border-black px-3 w-1/2 align-middle text-left">Name: <span className="text-[13px] ml-1">{data.cName}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">EPIC No. (if available) <span className="text-[13px] ml-1">{data.bEpicNo}</span></td>
            <td className="border border-black px-3 align-middle text-left">EPIC No. (if available) <span className="text-[13px] ml-1">{data.cEpicNo}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">Relative's Name: <span className="text-[13px] ml-1">{data.bRelativeName}</span></td>
            <td className="border border-black px-3 align-middle text-left">Relative's Name: <span className="text-[13px] ml-1">{data.cRelativeName}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">Relationship: <span className="text-[13px] ml-1">{data.bRelationship}</span></td>
            <td className="border border-black px-3 align-middle text-left">Relationship: <span className="text-[13px] ml-1">{data.cRelationship}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">District: <span className="text-[13px] ml-1">{data.bDistrict}</span></td>
            <td className="border border-black px-3 align-middle text-left">District: <span className="text-[13px] ml-1">{data.cDistrict}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">State: <span className="text-[13px] ml-1">{data.bState}</span></td>
            <td className="border border-black px-3 align-middle text-left">State: <span className="text-[13px] ml-1">{data.cState}</span></td>
          </tr>
          <tr className="h-7">
            <td className="border border-black px-3 align-middle text-left">AC Name: <span className="text-[13px] ml-1">{data.bAcName}</span></td>
            <td className="border border-black px-3 align-middle text-left">AC Name: <span className="text-[13px] ml-1">{data.cAcName}</span></td>
          </tr>
          <tr className="h-12">
            <td className="p-0 border border-black">
              <table className="w-full h-full border-collapse border-none">
                <tbody>
                  <tr className="h-5 font-bold text-left text-[11px]">
                    <td className="border-r border-black w-1/3 px-3 align-middle bg-[#f9fafb]">AC Number</td>
                    <td className="border-r border-black w-1/3 px-3 align-middle bg-[#f9fafb]">Part No.</td>
                    <td className="w-1/3 px-3 align-middle bg-[#f9fafb]">Sr No.</td>
                  </tr>
                  <tr className="h-7 text-left text-[13px]">
                    <td className="border-r border-black px-3 align-middle">{data.bAcNumber}</td>
                    <td className="border-r border-black px-3 align-middle">{data.bPartNo}</td>
                    <td className="px-3 align-middle">{data.bSrNo}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td className="p-0 border border-black">
              <table className="w-full h-full border-collapse border-none">
                <tbody>
                  <tr className="h-5 font-bold text-left text-[11px]">
                    <td className="border-r border-black w-1/3 px-3 align-middle bg-[#f9fafb]">AC Number</td>
                    <td className="border-r border-black w-1/3 px-3 align-middle bg-[#f9fafb]">Part No.</td>
                    <td className="w-1/3 px-3 align-middle bg-[#f9fafb]">Sr No.</td>
                  </tr>
                  <tr className="h-7 text-left text-[13px]">
                    <td className="border-r border-black px-3 align-middle">{data.cAcNumber}</td>
                    <td className="border-r border-black px-3 align-middle">{data.cPartNo}</td>
                    <td className="px-3 align-middle">{data.cSrNo}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Declarations (Numbered exactly as PDF) */}
      <div className="space-y-1.5 text-justify leading-[1.2] text-[11.5px] normal-case">
        <p>(i) The elector mentioned above, being myself/my family member, has not acquired the citizenship of any other country.</p>
        <p>(ii) I am applying for inclusion in the Electoral Roll, and the name mentioned above, being myself/ my family member, is not included in any other Assembly Constituency/ Parliamentary Constituency.</p>
        <p>(iii) I am aware that making the above statement or declaration in relation to this application which is false and which I know or believe to be false or do not believe to be true, is punishable under Section 31 of Representation of the People Act,1950 (43 of 1950) with imprisonment for a term which may extend to one year or with fine or with both.</p>

        <div className="flex flex-col items-end pt-2 font-bold uppercase tracking-tight text-right space-y-0.5">
          <p>Signature/Left Thumb Impression of Elector or</p>
          <p>Any Adult Family Member (mention relationship) with date</p>
          <div className="flex flex-col items-end gap-0.5 pt-2 text-[11.5px] normal-case font-normal">
            <span className="underline decoration-1 underline-offset-4">{data.electorSignatureName || '_________________________'}</span>
            <span className="underline decoration-1 underline-offset-4 pt-1">{data.date || '_________________________'}</span>
          </div>
        </div>

        <div className="pt-1 space-y-2">
          <p className="font-bold uppercase tracking-tight text-left">BLO’s undertaking: <span className="font-normal normal-case">I have verified the above details from the electoral roll(s) of the last SIR.</span></p>
          <p className="text-right font-bold uppercase tracking-tight">BLO’s Signature</p>
        </div>
      </div>
    </div>
  );
});

FormPreview.displayName = 'FormPreview';
