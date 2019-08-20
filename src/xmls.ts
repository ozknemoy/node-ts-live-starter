
export const chunkXml = `
<SG1>                    
  <RFF>
    <C506>
      <E1153>ON</E1153>
      <E1154>ЦПЛ00017947</E1154>
    </C506> 
    <trash>
      <trashE1151>tyu</trashE1151>
      <trashE1152>947</trashE1152>
    </trash>
  </RFF>
  <DTM>
    <C507>
      <E2005>171</E2005>
      <E2480>20180813</E2480>
      <E2479>102</E2479>
    </C507>
    <trashBranch>
      <qwer></qwer>
      <rew></rew>
    </trashBranch>
  </DTM>                
</SG1>
`;

export const bdsmXml = `
<root>
  <BGM>
      <C002>
         <E1001>632</E1001>
      </C002>
      <C106>
         <E1004>232_RECADV_avr</E1004>
      </C106>
      <E1225/>
   </BGM>
   <DTM>
      <C507>
         <E2005>137</E2005>
         <E2380>20181112</E2380>
         <E2379>102</E2379>
      </C507>
   </DTM>
   <DTM>
      <C507>
         <E2005>35</E2005>
         <E2380>20181115</E2380>
         <E2379>102</E2379>
      </C507>
   </DTM>
   <DTM>
      <C507>
         <E2005>50</E2005>
         <E2380>20181112</E2380>
         <E2379>102</E2379>
      </C507>
   </DTM>
</root>
`;

export const qualDict = {
  E2380: 'E2005',
  // dummy
  E2480: 'RFF/C506/E1153',
  E2479: 'E2555'
};

export const needlessBranchDict = [
  'trashE1151', 'trashE1152', 'trashBranch'
];