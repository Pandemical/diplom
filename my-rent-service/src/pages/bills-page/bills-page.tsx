import {JSX} from 'react'
import Header from '../../components/header/header';

function BillsPage(): JSX.Element {
    return (
        <body>
            <Header/>
            <main>
                <div className="content">
                    <div className="container-content-bills">
                        <div className="side-bar">
                            <p>Счета</p>
                            <button>+Добавить</button>
                            <input type="text" placeholder="Поиск"/>
                            <span>Сортировать по</span>
                            <select className="fillter-bills">
                                <option value="">Стандартно</option>
                                <option value="">А-Я</option>
                                <option value="">Я-А</option>
                                <option value="">Сумма по убыванию</option>
                                <option value="">Сумма по возврастанию</option>
                            </select>
                        </div>
                        <div className="main-content">
                            <div className="list-bills">
                                <div className="item-bill">
                                    <div className="background-logo"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxNiI+PGcgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTUuMjI1IDkuMjgzQTExLjIgMTEuMiAwIDAwNi42OCA5LjE5VjQuMTI0YTExLjE2OCAxMS4xNjggMCAwMC0xLjQ1Ni0uMDk0QzIuMzM5IDQuMDMgMCA1LjA5MSAwIDYuNHYuNTE0YzAgMS4zMDggMi4zNCAyLjM3IDUuMjI1IDIuMzd6bTAgMi42NDZjLjUwNSAwIC45OTMtLjAzMyAxLjQ1Ni0uMDkzVjEwLjM1Yy0uNDYzLjA2MS0uOTUxLjA5NC0xLjQ1Ni4wOTQtMi41MiAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTctLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zN3ptMS40NTUgMS4xODJ2LS4xMTVjLS40NjIuMDYtLjk1LjA5NC0xLjQ1NS4wOTQtMi41MiAwLTQuNjIxLS44MDktNS4xMTUtMS44ODQtLjA3Mi4xNTYtLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zNy41NzcgMCAxLjEzMi0uMDQzIDEuNjUtLjEyMWExLjg3IDEuODcgMCAwMS0uMTk0LS44Mjl2LS41MTR6TTEyLjc1OC4wMTdjLTIuODg2IDAtNS4yMjUgMS4wNi01LjIyNSAyLjM3VjIuOWMwIDEuMzEgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNiA1LjIyNC0yLjM3di0uNTEzYzAtMS4zMS0yLjMzOS0yLjM3LTUuMjI0LTIuMzd6Ii8+PHBhdGggZD0iTTEyLjc1OCA2LjQzMWMtMi41MTkgMC00LjYyMS0uODA4LTUuMTE1LTEuODg0LS4wNzIuMTU2LS4xMS4zMTktLjExLjQ4NXYuNTE0YzAgMS4zMDkgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNjEgNS4yMjQtMi4zN3YtLjUxNGMwLS4xNjYtLjAzOC0uMzI5LS4xMS0uNDg1LS40OTQgMS4wNzYtMi41OTYgMS44ODQtNS4xMTQgMS44ODR6Ii8+PHBhdGggZD0iTTEyLjc1OCA5LjA3N2MtMi41MTkgMC00LjYyMS0uODA5LTUuMTE1LTEuODg1YTEuMTYgMS4xNiAwIDAwLS4xMS40ODZ2LjUxNGMwIDEuMzA4IDIuMzQgMi4zNyA1LjIyNSAyLjM3czUuMjI0LTEuMDYyIDUuMjI0LTIuMzd2LS41MTRjMC0uMTY3LS4wMzgtLjMyOS0uMTEtLjQ4Ni0uNDk0IDEuMDc2LTIuNTk2IDEuODg1LTUuMTE0IDEuODg1eiIvPjxwYXRoIGQ9Ik0xMi43NTggMTEuODY1Yy0yLjUxOSAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTYtLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zN3M1LjIyNC0xLjA2MSA1LjIyNC0yLjM3di0uNTE0YzAtLjE2Ni0uMDM4LS4zMjktLjExLS40ODUtLjQ5NCAxLjA3NS0yLjU5NiAxLjg4NC01LjExNCAxLjg4NHoiLz48cGF0aCBkPSJNMTIuNzU4IDE0LjUxYy0yLjUxOSAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTctLjExLjMyLS4xMS40ODV2LjUxNGMwIDEuMzEgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNiA1LjIyNC0yLjM3di0uNTE0YzAtLjE2Ni0uMDM4LS4zMjgtLjExLS40ODUtLjQ5NCAxLjA3Ni0yLjU5NiAxLjg4NC01LjExNCAxLjg4NHoiLz48L2c+PC9zdmc+"/></div>
                                    <span>Наличные(название)</span>
                                    <span>Наличные(тип)</span>
                                    <span>97 543,00 ₽</span>
                                </div>
                                <div className="item-bill">
                                    <div className="background-logo"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxNiI+PGcgZmlsbD0iI0ZGRiI+PHBhdGggZD0iTTUuMjI1IDkuMjgzQTExLjIgMTEuMiAwIDAwNi42OCA5LjE5VjQuMTI0YTExLjE2OCAxMS4xNjggMCAwMC0xLjQ1Ni0uMDk0QzIuMzM5IDQuMDMgMCA1LjA5MSAwIDYuNHYuNTE0YzAgMS4zMDggMi4zNCAyLjM3IDUuMjI1IDIuMzd6bTAgMi42NDZjLjUwNSAwIC45OTMtLjAzMyAxLjQ1Ni0uMDkzVjEwLjM1Yy0uNDYzLjA2MS0uOTUxLjA5NC0xLjQ1Ni4wOTQtMi41MiAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTctLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zN3ptMS40NTUgMS4xODJ2LS4xMTVjLS40NjIuMDYtLjk1LjA5NC0xLjQ1NS4wOTQtMi41MiAwLTQuNjIxLS44MDktNS4xMTUtMS44ODQtLjA3Mi4xNTYtLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zNy41NzcgMCAxLjEzMi0uMDQzIDEuNjUtLjEyMWExLjg3IDEuODcgMCAwMS0uMTk0LS44Mjl2LS41MTR6TTEyLjc1OC4wMTdjLTIuODg2IDAtNS4yMjUgMS4wNi01LjIyNSAyLjM3VjIuOWMwIDEuMzEgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNiA1LjIyNC0yLjM3di0uNTEzYzAtMS4zMS0yLjMzOS0yLjM3LTUuMjI0LTIuMzd6Ii8+PHBhdGggZD0iTTEyLjc1OCA2LjQzMWMtMi41MTkgMC00LjYyMS0uODA4LTUuMTE1LTEuODg0LS4wNzIuMTU2LS4xMS4zMTktLjExLjQ4NXYuNTE0YzAgMS4zMDkgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNjEgNS4yMjQtMi4zN3YtLjUxNGMwLS4xNjYtLjAzOC0uMzI5LS4xMS0uNDg1LS40OTQgMS4wNzYtMi41OTYgMS44ODQtNS4xMTQgMS44ODR6Ii8+PHBhdGggZD0iTTEyLjc1OCA5LjA3N2MtMi41MTkgMC00LjYyMS0uODA5LTUuMTE1LTEuODg1YTEuMTYgMS4xNiAwIDAwLS4xMS40ODZ2LjUxNGMwIDEuMzA4IDIuMzQgMi4zNyA1LjIyNSAyLjM3czUuMjI0LTEuMDYyIDUuMjI0LTIuMzd2LS41MTRjMC0uMTY3LS4wMzgtLjMyOS0uMTEtLjQ4Ni0uNDk0IDEuMDc2LTIuNTk2IDEuODg1LTUuMTE0IDEuODg1eiIvPjxwYXRoIGQ9Ik0xMi43NTggMTEuODY1Yy0yLjUxOSAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTYtLjExLjMxOS0uMTEuNDg1di41MTRjMCAxLjMwOSAyLjM0IDIuMzcgNS4yMjUgMi4zN3M1LjIyNC0xLjA2MSA1LjIyNC0yLjM3di0uNTE0YzAtLjE2Ni0uMDM4LS4zMjktLjExLS40ODUtLjQ5NCAxLjA3NS0yLjU5NiAxLjg4NC01LjExNCAxLjg4NHoiLz48cGF0aCBkPSJNMTIuNzU4IDE0LjUxYy0yLjUxOSAwLTQuNjIxLS44MDgtNS4xMTUtMS44ODQtLjA3Mi4xNTctLjExLjMyLS4xMS40ODV2LjUxNGMwIDEuMzEgMi4zNCAyLjM3IDUuMjI1IDIuMzdzNS4yMjQtMS4wNiA1LjIyNC0yLjM3di0uNTE0YzAtLjE2Ni0uMDM4LS4zMjgtLjExLS40ODUtLjQ5NCAxLjA3Ni0yLjU5NiAxLjg4NC01LjExNCAxLjg4NHoiLz48L2c+PC9zdmc+"/></div>
                                    <span>Наличные(название)</span>
                                    <span>Наличные(тип)</span>
                                    <span>97 543,00 ₽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}

export default BillsPage;