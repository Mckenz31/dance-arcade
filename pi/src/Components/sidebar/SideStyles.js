import styled,{keyframes} from 'styled-components'

export  const SidebarContainer=styled.div`
    width: 256;
    // opacity:0.7;
    
    z-index:1000;
    .offcanvas{
        background: rgba( 255, 255, 255, 0.25 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );;
        width: 270px;
        .offcanvas-body{
            .row{
                backdrop-filter: blur(1px);
                .col{
                    .ant-typography{
                        margin-bottom:0px !important;
                    }
                }
            }
        }
    }
`