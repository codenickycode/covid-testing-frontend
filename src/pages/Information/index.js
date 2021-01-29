// import React from 'react';

const Information = () => {
  // throw new Error('I am an error!');
  return (
    <div id='information' className='page'>
      <h1>COVID-19 TESTING INFORMATION</h1>
      <p>
        CityMD is currently offering three forms of COVID-19 testing at all
        locations.
      </p>
      <ul>
        <li>Rapid Test</li>
        <li>PCR Test</li>
        <li>Serum Antibody IgG&#40;Blood Test&#41;</li>
      </ul>
      <h2>What do these COVID-19 tests detect?</h2>
      <p>
        <em>Rapid Test and PCR Test: </em>This test will detect if you are
        actively infected with the COVID-19 virus.  
      </p>
      <p>
        <em>Serum Antibody IgG &#40;Blood Test&#41;:</em> This test will detect
        if you have had prior exposure to or infection with COVID-19 and have
        built antibodies for the virus. For most viral illnesses, a positive
        antibody means prior exposure to a virus and possible immunity to future
        infection. As COVID-19 is a novel &#40;new&#41; infection, it is unclear
        if a positive antibody offers immunity. CityMD recommends universal
        precautions &#40;Hand washing, social distancing and masks when
        appropriate&#41;.
      </p>
      <h2>How are these tests administered?</h2>
      <p>
        <em>Rapid Test: </em>Administered via a nasal swab.
      </p>
      <p>
        <em>PCR Test: </em>Administered via a nasal swab. 
      </p>
       
      <p>
        <em>Serum Antibody IgG &#40;Blood Test&#41;: </em>Administered via a
        blood sample.
      </p>
    </div>
  );
};

// return <div id='information-div'></div>;
export default Information;
