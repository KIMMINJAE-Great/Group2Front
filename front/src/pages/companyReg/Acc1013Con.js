import React from "react";
import { Component } from "react";
import { get, post } from "../../components/api_url/API_URL";
import Acc1013 from "./Acc1013";


//회사등록 로직코드 (컨테이너)

class Acc1013Con extends Component {
  constructor(props) {
    super(props);
    this.state = {
      co_cd: "",  //회사 코드
      co_nm: "",  //회사 이름
      co_nk: "",  //회사 약칭
      use_yn: "",
      lng: "",
      adm_cd: "",
      bz_type: "",
      bz_item: "",
      co_tel: "",
      co_tel2: "",
      co_fax: "",
      reg_nb: "",
      cp_ct: "",
      cp_no: "",
      adr_zp: "",
      adr_inp: "",
      adr_etc: "",
      est_dt: "",
      opn_dt: "",
      cls_dt: '',
      ceo_nm: "",
      res_nb: "",
      domain: "",
      ac_per: "",
      ac_dt: "",
      acc_tp: "",
      url: "",
      sort: "",
      defaultLange: "",

      postcode: "",  //우편번호 5자리
      roadAddress: "",
      jibunAddress: "", //지번 주소
      extraAddress: "", //나머지 주소

      companyCards: [], //카드리스트
      companyCardData: [],//카드리스트에서 딱 하나 [0] 배열이다!!
    };

    //일부러 생성자에서 바인딩, 이 메서드를 콜백으로 사용할때 올바른 컨텍스트가 유지됨
    //또한 컴포넌트의 상태, 다른 메서드에 안전하게 접근가능
    this.handleInputChange = this.handleInputChange.bind(this);  //con의 인스턴스와 바인딩하기위해 사용
    this.handleSaveButton = this.handleSaveButton.bind(this);

  }

  //카드 클릭시 입력됨 (회사 코드로)
  handleCardClick = async (sco) => {
    const { co_cd } = sco;
    const data = { co_cd };


    /*
    const { 
      co_cd, co_nm, co_nk ,use_yn,lng,adm_cd,bz_type, bz_item, 
      co_tel, co_tel2, co_fax,  reg_nb, cp_ct, cp_no, adr_zp, adr_inp, 
      adr_etc, est_dt, opn_dt, cls_dt,ceo_nm, res_nb, domain, 
      ac_per, ac_dt, acc_tp, url, sort } = this.state;
    
      const data = { 
        co_cd, co_nm, co_nk, use_yn, lng,
        adm_cd, bz_type, bz_item, co_tel, co_tel2
        co_fax, reg_nb, cp_ct, cp_no, adr_zp,        
        adr_inp, adr_etc, est_dt, opn_dt, cls_dt,
        ceo_nm, res_nb, domain, ac_per, ac_dt,
        acc_tp, url, sort
    }; 
     */
    try {
      const response = await post('/company/selectCard', data);
      console.log(response);
      console.log("카드리스트 클릭됨!");
      this.setState({ companyCardData: response.data, co_cd: response.data.co_cd })
      this.fetchCompanyCards();

    } catch (error) {
      console.error(error);
      console.log("카드리스트 클릭 중에 오류발생");
    }
  }



  //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
  componentDidMount() {
    console.log('회사 관리 컴포넌트 디드마운트 실행..............')
    this.fetchCompanyCards();
  }

  //카드리스트(DB에 접근해서 가져오는것 계속 새로고침을 해야하기에..)
  fetchCompanyCards = async () => {

    try {
      const response = await get('/company/cardlist')
      console.log('Acc1013Con.........fetchCompanyCards 요청')
      this.setState({ companyCards: response.data });
    } catch (error) {
      console.log(error);
    }

  }


  //입력값의 변화를 저장함
  handleInputChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  }

  //저장 버튼을 눌렀을 때 실행할 함수
  handleSaveButton = async (e) => {
    e.preventDefault();
    const {
      co_cd, co_nm, co_nk, use_yn, lng, adm_cd, bz_type, bz_item,
      co_tel, co_tel2, co_fax, reg_nb, cp_ct, cp_no, adr_zp, adr_inp,
      adr_etc, est_dt, opn_dt, cls_dt, ceo_nm, res_nb, domain,
      ac_per, ac_dt, acc_tp, url, sort } = this.state;
    //필드데이터
    const data = {
      co_cd,
      co_nm,
      co_nk,
      use_yn,
      lng,
      adm_cd,
      bz_type,
      bz_item,
      co_tel,
      co_tel2,
      co_fax,
      reg_nb,
      cp_ct,
      cp_no,
      adr_zp,
      adr_inp,
      adr_etc,
      est_dt,
      opn_dt,
      cls_dt,
      ceo_nm,
      res_nb,
      domain,
      ac_per,
      ac_dt,
      acc_tp,
      url,
      sort
    };
    try {
      const response = await post('/company/save', data);
      console.log(response);
      console.log("회사등록(DB)이 정상 실행");
      this.fetchCompanyCards();  //카드리스트 새로고침됨!
    } catch (error) {
      console.error(error);
      console.log("회사등록(DB) 중에 오류발생");
    }

  }
  //삭제 버튼을 눌렀을 때 실행할 함수
  handleDeleteButton = async (e) => {
    e.preventDefault();
    //필드데이터 // 회사 코드만 있으면 된다.
    const data = {
      co_cd: this.state.co_cd,
    };
    // Send data to server
    try {
      const response = await post('/company/delete', data)
      console.log(response);
      console.log("회사정보(DB) 삭제가 정상 실행");
      this.fetchCompanyCards();
    } catch (error) {
      console.error(error);
      console.log("회사정보(DB) 삭제중에 오류발생");
    }

  }

  //우편주소 코드
  handlePostComplete = (data) => {
    let extraAddress = '';
    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '' && data.apartment === 'Y') {
      extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
    }
    if (extraAddress !== '') {
      extraAddress = ' (' + extraAddress + ')';
    }
    this.setState({
      postcode: data.zonecode,
      roadAddress: data.roadAddress,
      jibunAddress: data.jibunAddress,
      extraAddress,
    });
  }

  render() {


    return (

      <Acc1013
        {...this.state}
        companyCardData={this.state.companyCardData}
        onInputChange={this.handleInputChange}
        handleSaveButton={this.handleSaveButton}
        handleDeleteButton={this.handleDeleteButton}
        handleCardClick={this.handleCardClick}
        co_cd={this.state.co_cd}
        sco={this.state.companyCards}//카드리스트 sco 삭제X


        onComplete={this.handlePostComplete}
      />


    );
  }
}

export default Acc1013Con;
