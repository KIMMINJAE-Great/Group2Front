import React, { Component } from 'react';
import Acc1012 from './Acc1012';
import { get, post, del } from '../../components/api_url/API_URL';

class Acc1012Con extends Component {
    constructor(props) {
        super(props);
        this.state = {

            /* 주소 관련 state */
            postcode: "",
            roadAddress: "",
            jibunAddress: "",
            extraAddress: "",

            /* 거래처 state */
            bp_classification: "",            /* 거래처 구분 */
            bp_name: "",                      /* 거래처명 */
            bp_code: "",                      /* 거래처코드 */
            bp_abbreviation: "",              /* 거래처약칭 */
            com_reg_num: "",                  /* 사업자등록번호 */
            nationality: "",                  /* 국적 */
            res_reg_num: "",                  /* 주민등록번호 */
            rep_name: "",                     /* 대표자명 */
            bus_conditions: "",               /* 업태 */
            sectors: "",                      /* 업종 */
            zip_code: "",                     /* 우편번호 */
            primary_address: "",              /* 기본주소 */
            detailed_address: "",             /* 상세주소 */
            phone_num: "",                    /* 전화번호 */
            home_page: "",                    /* 홈페이지 */
            mail_address: "",                 /* 메일주소 */
            main_code: "",                    /* 주류코드 */
            country_code: "",                 /* 국가코드 */

            select_bp_classification: "전체", /* select 거래처구분 */
            select_nationality: "내국인",     /* select 국적 */

            search_bp_classification: "전체", /* search 거래처구분 */
            search_bp_code: "",               /* search 거래처코드 */
            search_bp_name: "",               /* search 거래처명 */
            search_useWhether: "전체",        /* search 사용여부 */

            //   departmentCards: [], /* 검색 결과를 담을 배열 => 카드리스트에서 사용할 예정 */

            companyCards: [], //카드리스트
            companyCardData: [],//카드리스트에서 딱 하나 [0] 배열이다!!

        };
        /* 바인딩 해줘야 아래 메소드가 항상 컴포넌트 인스턴스에 올바르게 연결됨(중요)!*/
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
    }

    /* 입력 필드의 값이 변경될 때 호출할 함수 */
    // handleInputChange(e) {
    //     this.setState({
    //         ...this.state,
    //         [e.target.name]: e.target.value,
    //     });
    // }

    //카드 클릭시 입력됨 (회사 코드로)
    handleCardClick = async (sco) => {
        const { bp_code } = sco;
        const data = { bp_code };


        //     /*
        //     const { 
        //       co_cd, co_nm, co_nk ,use_yn,lng,adm_cd,bz_type, bz_item, 
        //       co_tel, co_tel2, co_fax,  reg_nb, cp_ct, cp_no, adr_zp, adr_inp, 
        //       adr_etc, est_dt, opn_dt, cls_dt,ceo_nm, res_nb, domain, 
        //       ac_per, ac_dt, acc_tp, url, sort } = this.state;

        //       const data = { 
        //         co_cd, co_nm, co_nk, use_yn, lng,
        //         adm_cd, bz_type, bz_item, co_tel, co_tel2
        //         co_fax, reg_nb, cp_ct, cp_no, adr_zp,        
        //         adr_inp, adr_etc, est_dt, opn_dt, cls_dt,
        //         ceo_nm, res_nb, domain, ac_per, ac_dt,
        //         acc_tp, url, sort
        //     }; 
        //      */

        try {
            const response = await post('/tradeManagement/selectCardList', data);
            console.log(response);
            console.log("카드리스트 클릭됨!");
            this.setState({ companyCardData: response.data, bp_code: response.data.bp_code });
            this.fetchCompanyCards();  //카드리스트 새로고침됨!
        } catch (error) {
            console.error(error);
            console.log("카드리스트 클릭 중에 오류발생");
        }


    }

    //카드리스트 가져오기위해 componentDidMount로 시작하면 바로 미리 가져온다.
    componentDidMount() {
        this.fetchCompanyCards();
    }

    //카드리스트(DB에 접근해서 가져오는것 계속 새로고침을 해야하기에..)
    fetchCompanyCards = async () => {

        try {
            const response = await get('/tradeManagement/getCardlist')
            this.setState({ companyCards: response.data });
        } catch (error) {
            console.log(error);
        }

    }

    handleInputChange(e) {
        const { name, value } = e.target;

        /* 거래처구분과 국적 값이 변경되면 state에 반영하고, 그렇지 않으면 기존의 state를 유지 */
        if (name === 'select_bp_classification' || name === 'select_nationality') {
            this.setState({
                [name]: value,
                bp_classification: name === 'select_bp_classification' ? value : this.state.bp_classification,
                nationality: name === 'select_nationality' ? value : this.state.nationality,
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    /* SELECT 박스 필드의 값이 변경될 때 호출할 함수 */
    // handleSelectChange = (name, value) => {
    //     this.setState({
    //         [name]: value,
    //     });
    // };

    handleSelectChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    /* onChange Start */
    /* 필드 값이 변경될 때 호출, 해당 값을 컴포넌트의 state에 업데이트! */
    onChangeBp_classification = (bp_classification) => {
        this.setState({ bp_classification });
    }
    onChangeBp_name = (bp_name) => {
        this.setState({ bp_name });
    }
    onChangeBp_code = (bp_code) => {
        this.setState({ bp_code });
    }
    onChangeBp_abbreviation = (bp_abbreviation) => {
        this.setState({ bp_abbreviation });
    }
    onChangeCom_reg_num = (com_reg_num) => {
        this.setState({ com_reg_num });
    }
    onChangeNationality = (nationality) => {
        this.setState({ nationality });
    }
    onChangeRes_reg_num = (res_reg_num) => {
        this.setState({ res_reg_num });
    }
    onChangeRep_name = (rep_name) => {
        this.setState({ rep_name });
    }
    onChangeBus_conditions = (bus_conditions) => {
        this.setState({ bus_conditions });
    }
    onChangeZip_code = (zip_code) => {
        this.setState({ zip_code });
    }
    onChangePrimary_address = (primary_address) => {
        this.setState({ primary_address });
    }
    onChangeDetailed_address = (detailed_address) => {
        this.setState({ detailed_address });
    }
    onChangePhone_num = (phone_num) => {
        this.setState({ phone_num });
    }
    onChangeFax_num = (fax_num) => {
        this.setState({ fax_num });
    }
    onChangeHome_page = (home_page) => {
        this.setState({ home_page });
    }
    onChangeMail_address = (mail_address) => {
        this.setState({ mail_address });
    }
    onChangeMain_code = (main_code) => {
        this.setState({ main_code });
    }
    onChangeCountry_code = (country_code) => {
        this.setState({ country_code });
    }
    onChangeCountry_code = (country_code) => {
        this.setState({ country_code });
    }
    onChangeSelect_bp_classification = (select_bp_classification) => {
        this.setState({ select_bp_classification });
    }
    onChangeSelect_nationality = (select_nationality) => {
        this.setState({ select_nationality });
    }
    /* onChange End */

    /* 우편번호 가져오기 */
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
    };

    /* 저장 클릭하면 INSERT */
    handleInsertClick = async (e) => {
        e.preventDefault();

        /* select 거래처구분, 국적 외에 속성들은 모두 rest 에 담음 => 코드 간결 */
        const { select_bp_classification, select_nationality, bp_classification: state_bp_classification, nationality: state_nationality, ...rest } = this.state;
        /* select 거래처구분 값이 변경되지 않았을 때는 bp_classification을 "전체"로 저장*/
        const bp_classification = select_bp_classification === "전체" ? "전체" : state_bp_classification;
        console.log(bp_classification);

        /* select 국적 변경 값 저장 */
        const nationality = select_nationality === "내국인" ? "내국인" : "외국인";
        console.log(nationality);

        try {
            /* 데이터 서버로 보내기 */
            const respone = await post('/tradeManagement/insertData', { ...rest, bp_classification, nationality });
            window.alert("저장되었습니다!");
            console.log("거래처등록이 정상 실행");
            this.fetchCompanyCards();  //카드리스트 새로고침됨!
            /* 필드들을 빈 값으로 초기화 => 안되서 수정중 */
            this.setState({
                // bp_name: "",
                // bp_code: "",
                // bp_abbreviation: "",
                // com_reg_num: "",
                // nationality: "",
                // res_reg_num: "",
                // rep_name: "",
                // bus_conditions: "",
                // zip_code: "",
                // primary_address: "",
                // detailed_address: "",
                // phone_num: "",
                // home_page: "",
                // mail_address: "",
                // main_code: "",
                // country_code: "",
                select_bp_classification: "전체",
                select_nationality: "내국인",
                search_bp_classification: "전체",
                search_useWhether: "전체"
            });
        } catch (error) {
            // 실패 메시지 출력
            console.error(error);
            console.log("회사등록(DB) 중에 오류발생");
        }
    }

    /* handleSearchClick 함수 추가 => 수정중 */
    //   handleSearchClick = async () => {
    //     try {
    //         const { search_bp_classification, search_bp_code, search_bp_name,  } = this.state;

    //       // 데이터 서버로 보내기
    //       const response = await axios.post('http://localhost:8080/getSearchData', {

    //       bp_classification: search_bp_classification,
    //       bp_code: search_bp_code,
    //       bp_name: search_bp_name,

    //       });

    //       // 성공적으로 데이터를 가져온 경우
    //     //   const searchData = response.data;

    //       // searchData를 이용하여 state 업데이트
    //       // 여기서는 departmentCards와 같은 state를 업데이트하는 예시로 작성합니다.
    //     //   this.setState({
    //     //     departmentCards: searchData,
    //     //   });

    //     } catch (error) {
    //       // 실패 메시지 출력
    //       console.error(error);
    //       console.log("데이터 검색 중에 오류 발생");
    //     }
    //   }

    render() {

        const {
            // search_bp_classification,
            // search_bp_code,
            // search_bp_name,
            // departmentCards,
            select_bp_classification,
            select_nationality,
        } = this.state;
        return (
            <Acc1012

                select_bp_classification={this.state.select_bp_classification}
                select_nationality={this.state.select_nationality}
                // search_bp_classification={search_bp_classification}
                // search_useWhether={search_useWhether}
                // departmentCards={departmentCards}

                handleSearchClick={this.handleSearchClick}
                handleInsertClick={this.handleInsertClick}
                onInputChange={this.handleInputChange}
                onChangeNationality={this.onChangeNationality}
                //   handleSelectChange={this.handleSelectChange}

                handleCardClick={this.handleCardClick}
                companyCardData={this.state.companyCardData}

                sco={this.state.CompanyCards}

                {...this.state} onComplete={this.handlePostComplete}
            />
        );
    };
}

export default Acc1012Con;