import styled,{keyframes} from 'styled-components'

export  const SidebarContainer=styled.div`
    width: 256;
    z-index:1000;
    .offcanvas{
        width: 300px;
        .offcanvas-body{
            .row{
                .col{
                    .ant-typography{
                        margin-bottom:0px !important;
                    }
                }
            }
        }
    }
`